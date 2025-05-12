FactoryBot.define do
    factory :transaction do
        sequence(:name) { |n| "Transaction #{n}" }
        amount { 10 }
        amount_in_default_currency { 10 }
        currency { 'EUR' }
        association :category
        date { Time.now }
        country_code { 'FR' }
    end
end
