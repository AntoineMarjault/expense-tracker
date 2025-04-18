class Transaction < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_and_belongs_to_many :tags, join_table: 'tags_transactions', class_name: 'Tag'

    validates :amount, presence: true

    def as_json(options = {})
        super(only: [ :id, :amount, :name, :date, :currency, :category_id ]).tap do |hash|
          hash["amount"] = amount.to_f if amount.present?
          hash["tags"] = tags.pluck(:name)
        end
    end
end
