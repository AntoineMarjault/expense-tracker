class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :amount, presence: true
  validates :country_code, length: { is: 2 }, allow_nil: true

  def as_json(options = {})
    super(only: [ :id, :amount, :name, :date, :currency, :category_id, :country_code ]).tap do |hash|
      hash["amount"] = amount.to_f if amount.present?
    end
  end
end
