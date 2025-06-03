require 'rails_helper'

RSpec.describe Travel, type: :model do
  let(:user) { FactoryBot.create(:user) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      travel = Travel.new(name: 'Vietnam travel', user: user, target_amount: 100, start_date: Date.today, end_date: Date.today + 1.week)
      expect(travel).to be_valid
    end

    it 'is not valid without a name' do
      travel = Travel.new(target_amount: 100, user: user, start_date: Date.today, end_date: Date.today + 1.week)
      expect(travel).not_to be_valid
    end

    it 'is not valid without a target_amount' do
      travel = Travel.new(name: 'Vietnam travel', user: user, start_date: Date.today, end_date: Date.today + 1.week)
      expect(travel).not_to be_valid
    end

    it 'is not valid with a non-numeric target_amount' do
      travel = Travel.new(name: 'Vietnam travel', user: user, start_date: Date.today, end_date: Date.today + 1.week, target_amount: 'hello')
      expect(travel).not_to be_valid
    end

    it 'is not valid without a start_date and end_date' do
      travel = Travel.new(name: 'Vietnam travel', user: user, target_amount: 100)
      expect(travel).not_to be_valid
    end
  end
end
