class Budget < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :categories

  validates :name, presence: true
  validates :target_amount, presence: true, numericality: { greater_than: 0 }
  validates :start_date, :end_date, presence: true
  validate :end_date_after_start_date

  def spent_amount
    filtered_transactions.sum(:amount).to_f
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

  def target_daily_amount
    (target_amount / total_days_in_budget).round(2).to_f
  end

  def daily_cumulative_spending
    daily_amounts = filtered_transactions
      .group("DATE(date)")
      .sum(:amount)

      cumulative_amounts = 0
      cumulative_spending = []

      (start_date..end_date).each do |date|
        if daily_amounts[date]
          cumulative_amounts += daily_amounts[date].to_f
        end

        days_elapsed = number_of_days(from_date: start_date, to_date: date)
        target_at_date = (target_daily_amount * days_elapsed).round(2)

        cumulative_spending << {
          date: date,
          cumulative_amount: cumulative_amounts,
          target_amount: target_at_date
        }
    end

    cumulative_spending
  end

  def expenses_per_category
    filtered_transactions
      .joins(:category)
      .group("categories.id", "categories.name", "categories.emoji", "categories.color")
      .order("SUM(transactions.amount) DESC")
      .sum(:amount)
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

  def as_json(options = {})
    super(options.merge(methods: %i[tags categories spent_amount remaining_amount progress_percentage average_daily_spending target_daily_amount daily_cumulative_spending expenses_per_category]))
  end

  private

  def filtered_transactions
    tag_ids = tags.pluck(:id)
    category_ids = categories.pluck(:id)

    base_query = Transaction.where(user_id: user_id, date: start_date..end_date)

    return base_query if tag_ids.empty? && category_ids.empty?

    filtered_by_tags = tag_ids.any? ? base_query.filter_by_tags(tag_ids) : nil
    filtered_by_categories = category_ids.any? ? base_query.filter_by_categories(category_ids) : nil

    if filtered_by_tags && filtered_by_categories
      filtered_by_tags.or(filtered_by_categories)
    elsif filtered_by_tags
      filtered_by_tags
    else
      filtered_by_categories
    end
  end

  def total_days_in_budget
    number_of_days(from_date: start_date, to_date: end_date)
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
