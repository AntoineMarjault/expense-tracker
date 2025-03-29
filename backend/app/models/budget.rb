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

  def as_json(options = {})
    super(options.merge(methods: %i[spent_amount remaining_amount progress_percentage]))
  end

  private

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    if end_date < start_date
      errors.add(:end_date, "should be after start_date")
    end
  end
end
