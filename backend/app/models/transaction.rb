class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :amount, presence: true
  validates :amount_in_default_currency, presence: true
  validates :country_code, length: { is: 2 }, allow_nil: true

  before_validation :set_amount_in_default_currency, if: :should_convert_amount?

  def as_json(options = {})
    super(only: [ :id, :amount, :amount_in_default_currency, :name, :date, :currency, :category_id, :country_code ]).tap do |hash|
      hash["amount"] = amount.to_f if amount.present?
    end
  end

  private

  def should_convert_amount?
    amount.present? && currency.present? &&
    (amount_in_default_currency.nil? || amount_changed? || currency_changed?)
  end

  def set_amount_in_default_currency
    return if currency == user.default_currency

    self.amount_in_default_currency = currency_converter.convert(
      amount: amount,
      from: currency,
      to: user.default_currency
    )
  end

  def currency_converter
    @currency_converter ||= CurrencyConverter.new
  end
end
