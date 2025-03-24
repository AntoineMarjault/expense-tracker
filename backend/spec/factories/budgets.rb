FactoryBot.define do
  factory :budget do
    name { "My budget" }
    target_amount { "9.99" }
    start_date { "2025-03-24" }
    end_date { "2025-03-24" }
    user { nil }
  end
end
