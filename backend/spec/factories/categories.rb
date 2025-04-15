FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "Category #{n}" }
    color { '#eb3434' }
    emoji { 'upside-down-face' }
  end
end
