class Transaction < ApplicationRecord
    belongs_to :user
    belongs_to :category
    belongs_to :location, optional: true, dependent: :destroy
    has_and_belongs_to_many :tags, join_table: 'tags_transactions', class_name: 'Tag'

    validates :amount, presence: true

    scope :filter_by_tags, ->(tag_ids) {
        joins(:tags).where(tags: { id: tag_ids }).distinct
    }
    scope :filter_by_categories, ->(category_ids) {
        joins(:category).where(categories: { id: category_ids }).distinct
    }

    def as_json(options = {})
        super(only: [ :id, :amount, :name, :date, :currency, :category_id ]).tap do |hash|
          hash["amount"] = amount.to_f if amount.present?
          hash["tags"] = tags.pluck(:name)
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
