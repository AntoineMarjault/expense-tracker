class Transaction < ApplicationRecord
    belongs_to :user
    belongs_to :category

    validates :amount, presence: true

    def as_json(options = {})
        super(only: [:id, :amount, :name, :date, :currency, :category_id]).tap do |hash|
          hash['amount'] = amount.to_f if amount.present?
        end
    end
end
