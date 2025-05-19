class Travel < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :target_amount, presence: true, numericality: { greater_than: 0 }
  validates :start_date, :end_date, presence: true
  validate :end_date_after_start_date

  def spent_amount
    user_transactions_within_travel_period.sum(:amount_in_default_currency).to_f
  end

  def remaining_amount
    (target_amount - spent_amount).to_f
  end

  def progress_percentage
    (spent_amount.to_f / target_amount * 100).round(1).to_f
  end

  def average_daily_spending
    today_or_end_date = [ end_date, Date.today ].min
    (spent_amount / number_of_days(from_date: start_date, to_date: today_or_end_date)).round(2)
  end

  def daily_spending_target
    (target_amount / travel_duration_in_days).round(2).to_f
  end

  def daily_cumulative_spending
    spending_per_day = user_transactions_within_travel_period
      .group("DATE(date)")
      .sum(:amount_in_default_currency)

    cumulative_spending = 0
    cumulative_spending_per_day = []

    (start_date..end_date).each do |current_date|
      spending_at_current_date = spending_per_day[current_date]
      number_of_days_elapsed = number_of_days(from_date: start_date, to_date: current_date)

      if spending_at_current_date
        cumulative_spending += spending_at_current_date.to_f
      end
      spending_target_for_current_date = (daily_spending_target * number_of_days_elapsed).round(2)

      cumulative_spending_per_day << {
        date: current_date,
        cumulative_amount: cumulative_spending,
        target_amount: spending_target_for_current_date
      }
    end

    cumulative_spending_per_day
  end

  def expenses_per_category
    user_transactions_within_travel_period
      .joins(:category)
      .group("categories.id", "categories.name", "categories.emoji", "categories.color")
      .order("SUM(transactions.amount_in_default_currency) DESC")
      .sum(:amount_in_default_currency)
      .map { |key, total|
        id, name, emoji, color = key
        {
          category_id: id,
          category_name: name,
          category_emoji: emoji,
          category_color: color,
          total_expense: total.to_f
        }
      }
  end

  def average_daily_spending_per_country
    spending_per_country = user_transactions_within_travel_period
      .group(:country_code)
      .sum(:amount_in_default_currency)

    days_per_country = travel_duration_in_days_per_country

    spending_per_country.map do |country_code, spending|
      number_of_days = days_per_country[country_code] || 1
      [country_code, (spending / number_of_days).round(2)]
    end.to_h
  end

  def as_json(options = {})
    super(options.merge(methods: %i[spent_amount remaining_amount progress_percentage average_daily_spending average_daily_spending_per_country daily_spending_target daily_cumulative_spending expenses_per_category]))
  end

  private

  def user_transactions_within_travel_period
    Transaction.where(user_id: user_id, date: start_date..end_date)
  end

  def travel_duration_in_days
    number_of_days(from_date: start_date, to_date: end_date)
  end

  def travel_duration_in_days_per_country
    # Get all transactions within the travel period
    transactions = user_transactions_within_travel_period.order(:date)
    return {} if transactions.empty?

    # Split transactions into periods based on country changes
    periods = []
    current_country_code = transactions.first.country_code
    start_date = local_date(transactions.first)

    transactions.each do |transaction|
      if transaction.country_code != current_country_code
        periods << { country: current_country_code, period: (start_date..local_date(transaction)) }
        current_country_code = transaction.country_code
        start_date = local_date(transaction)
      end
    end
    periods << { country: current_country_code, period: (start_date..local_date(transactions.last)) } if start_date

    # Regroup periods by country and calculate the total days for each country
    days_per_country = Hash.new(0)
    periods.each do |entry|
      country = entry[:country]
      period = entry[:period]
      days_per_country[country] += (period.end - period.begin).to_i + 1
    end

    days_per_country
  end

  def local_date(transaction)
    timezone = TZInfo::Country.get(transaction.country_code).zone_info.first.timezone
    transaction.date.in_time_zone(timezone).to_date
  rescue TZInfo::InvalidCountryCode
    transaction.date.to_date
  end

  def number_of_days(from_date:, to_date:)
    (to_date - from_date).to_i + 1
  end

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "should be after start_date")
    end
  end
end
