require 'rails_helper'

RSpec.describe Budget, type: :model do
  let(:user) { FactoryBot.create(:user) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      budget = Budget.new(name: 'Vietnam travel', user: user, target_amount: 100, start_date: Date.today, end_date: Date.today + 1.week)
      expect(budget).to be_valid
    end

    it 'is not valid without a name' do
      budget = Budget.new(target_amount: 100, user: user, start_date: Date.today, end_date: Date.today + 1.week)
      expect(budget).not_to be_valid
    end

    it 'is not valid without a target_amount' do
      budget = Budget.new(name: 'Vietnam travel', user: user, start_date: Date.today, end_date: Date.today + 1.week)
      expect(budget).not_to be_valid
    end

    it 'is not valid with a non-numeric target_amount' do
      budget = Budget.new(name: 'Vietnam travel', user: user, start_date: Date.today, end_date: Date.today + 1.week, target_amount: 'hello')
      expect(budget).not_to be_valid
    end

    it 'is not valid without a start_date and end_date' do
      budget = Budget.new(name: 'Vietnam travel', user: user, target_amount: 100)
      expect(budget).not_to be_valid
    end
  end

  describe '#spent_amount' do
    it 'returns the sum of all transactions within the budget period' do
      budget = FactoryBot.create(:budget, user: user, start_date: Date.today, end_date: Date.today + 1.week, target_amount: 100)
      FactoryBot.create(:transaction, user: user, amount: 10, date: Date.today)
      FactoryBot.create(:transaction, user: user, amount: 10, date: Date.today + 1.day)
      FactoryBot.create(:transaction, user: user, amount: 10, date: Date.today + 1.month)

      expect(budget.spent_amount).to eq(20)
    end

    it 'computes the spent amount only on transactions created by the user' do
      other_user = FactoryBot.create(:user)
      budget = FactoryBot.create(:budget, user: user, start_date: Date.today, end_date: Date.today + 1.week, target_amount: 100)
      FactoryBot.create(:transaction, user: user, amount: 10, date: Date.today)
      FactoryBot.create(:transaction, user: other_user, amount: 10, date: Date.today + 1.day)

      expect(budget.spent_amount).to eq(10)
    end
  end
end
