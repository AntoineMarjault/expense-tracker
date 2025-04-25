class Transaction < ApplicationRecord
    belongs_to :user
    belongs_to :category
    belongs_to :location, optional: true, dependent: :destroy

    validates :amount, presence: true

    def as_json(options = {})
        super(only: [ :id, :amount, :name, :date, :currency, :category_id ]).tap do |hash|
          hash["amount"] = amount.to_f if amount.present?
          if location
            hash["location"] = {
              place_name: location.place_name,
              country_code: location.country_code,
              country_name: location.country_name,
              flag: location.country_flag
            }
          end
        end
    end
end
