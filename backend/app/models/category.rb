class Category < ApplicationRecord
    has_many :transactions

    def as_json(options = {})
        super(only: [:id, :name, :color, :emoji])
    end
end
