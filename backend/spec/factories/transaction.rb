FactoryBot.define do
    factory :transaction do
        sequence(:name) { |n| "Transaction #{n}" }
        amount { 10 }
        currency { 'EUR' }
        association :category
        date { Time.now }
    end
end