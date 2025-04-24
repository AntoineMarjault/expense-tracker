FactoryBot.define do
  factory :travel do
    name { "My travel" }
    target_amount { 9.99 }
    start_date { "2025-03-24" }
    end_date { "2025-03-24" }
    user { nil }
  end
end
