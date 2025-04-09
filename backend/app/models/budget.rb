class Budget < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :target_amount, presence: true, numericality: { greater_than: 0 }
  validates :start_date, :end_date, presence: true
  validate :end_date_after_start_date

  def spent_amount
    Transaction.where(user_id: user_id, date: start_date..end_date).sum(:amount).to_f
  end

  def remaining_amount
    (target_amount - spent_amount).to_f
  end

  def progress_percentage
    (spent_amount.to_f / target_amount * 100).round(1).to_f
  end

  def average_daily_spending
    today_or_end_date = [end_date, Date.today].min
    (spent_amount / (today_or_end_date - start_date).to_i).round(2)
  end

  def target_daily_amount
    ((target_amount || 0) / (end_date - start_date).to_i).round(2).to_f
  end

  def daily_cumulative_spending
    daily_amounts = Transaction
      .where(user_id: user_id, date: start_date..end_date)
      .group(:date)
      .sum(:amount)
      .transform_keys { |date| date.to_date }

      cumulative_amounts = 0
      cumulative_spending = []

      (start_date..end_date).each do |date|
        if daily_amounts[date]
          cumulative_amounts += daily_amounts[date].to_f
        end

        days_elapsed = (date - start_date).to_i + 1
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
    Transaction
      .where(user_id: user_id, date: start_date..end_date)
      .joins(:category)
      .group('categories.id', 'categories.name', 'categories.emoji', 'categories.color')
      .order('SUM(transactions.amount) DESC')
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
    super(options.merge(methods: %i[spent_amount remaining_amount progress_percentage average_daily_spending target_daily_amount daily_cumulative_spending expenses_per_category]))
  end

  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "should be after start_date")
    end
  end
end
