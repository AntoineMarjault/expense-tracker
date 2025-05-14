FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email_#{n}@email.com" }
    password_digest { "password_digest" }
    default_currency { "EUR" }
  end
end
