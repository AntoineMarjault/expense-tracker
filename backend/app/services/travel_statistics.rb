class TravelStatistics
  def initialize(start_date:, end_date:, target_amount:, transactions:)
    @start_date = start_date
    @end_date = end_date
    @target_amount = target_amount
    @transactions = transactions
  end

  def compute
    {
      spent_amount: spent_amount,
      remaining_amount: remaining_amount,
      progress_percentage: progress_percentage,
      daily_spending_target: daily_spending_target,
      average_daily_spending: average_daily_spending,
      daily_cumulative_spending: daily_cumulative_spending,
      expenses_per_category: expenses_per_category,
      average_daily_spending_per_country: average_daily_spending_per_country
    }
  end

  private

  def remaining_amount
    (@target_amount - spent_amount).to_f
  end

  def progress_percentage
    (spent_amount / @target_amount * 100).round(1).to_f
  end

  def daily_spending_target
    (@target_amount / travel_duration_in_days).round(2).to_f
  end

  def average_daily_spending
    today_or_end_date = [@end_date, Date.today].min
    (spent_amount / number_of_days(from_date: @start_date, to_date: today_or_end_date)).round(2)
  end

  def spent_amount
    @transactions.sum(:amount_in_default_currency).to_f
  end

  def daily_cumulative_spending
    spending_per_day = @transactions.group("DATE(date)").sum(:amount_in_default_currency)

    cumulative_spending = 0
    cumulative_spending_per_day = []

    (@start_date..@end_date).each do |current_date|
      spending_at_current_date = spending_per_day[current_date]
      number_of_days_elapsed = number_of_days(from_date: @start_date, to_date: current_date)

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
    @transactions
      .joins(:category)
      .group("categories.id", "categories.name", "categories.emoji", "categories.color")
      .order("SUM(transactions.amount_in_default_currency) DESC")
      .sum(:amount_in_default_currency)
      .map { |key, total| format_category_expense(key, total) }
  end

  def average_daily_spending_per_country
    spending_per_country = @transactions.group(:country_code).sum(:amount_in_default_currency)

    days_per_country = travel_duration_in_days_per_country

    spending_per_country.map do |country_code, spending|
      number_of_days = days_per_country[country_code] || 1
      [country_code, (spending / number_of_days).round(2)]
    end.to_h
  end

  def travel_duration_in_days
    number_of_days(from_date: @start_date, to_date: @end_date)
  end

  def number_of_days(from_date:, to_date:)
    (to_date - from_date).to_i + 1
  end

  def format_category_expense(key, total)
    id, name, emoji, color = key
    {
      category_id: id,
      category_name: name,
      category_emoji: emoji,
      category_color: color,
      total_expense: total.to_f
    }
  end

  def travel_duration_in_days_per_country
    return {} if @transactions.empty?

    periods = split_into_periods_per_country(transactions: @transactions.order(:date))
    compute_total_days_spent_per_country(periods: periods)
  end

  def split_into_periods_per_country(transactions:)
    return [] if transactions.empty?

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

    periods
  end

  def compute_total_days_spent_per_country(periods:)
    periods.reduce(Hash.new(0)) do |days_per_country, period|
      days_per_country[period[:country]] += (period[:period].end - period[:period].begin).to_i + 1
      days_per_country
    end
  end

  def local_date(transaction)
    timezone = TZInfo::Country.get(transaction.country_code).zone_info.first.timezone
    transaction.date.in_time_zone(timezone).to_date
  rescue TZInfo::InvalidCountryCode
    transaction.date.to_date
  end
end