class Transaction < ApplicationRecord
    validates :amount, presence: true
end
