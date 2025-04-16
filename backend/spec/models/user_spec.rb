require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = User.new(email: 'test@example.com', password: 'password123')
      expect(user).to be_valid
    end

    it 'is not valid without an email' do
      user = User.new(password: 'password123')
      expect(user).not_to be_valid
    end

    it 'is not valid without a password' do
      user = User.new(email: 'test@example.com')
      expect(user).not_to be_valid
    end

    it 'is not valid with a duplicate email' do
      User.create(email: 'test@example.com', password: 'password123')
      user = User.new(email: 'test@example.com', password: 'password123')
      expect(user).not_to be_valid
    end

    describe 'associations' do
      it 'deletes associated transactions and budgets when user is destroyed' do
        user = User.create!(email: 'test@example.com', password: 'password123')
        transaction = FactoryBot.create(:transaction, user: user)
        budget = FactoryBot.create(:budget, user: user)

        expect { user.destroy }.to change { Transaction.count }.by(-1)
          .and change { Budget.count }.by(-1)
      end
    end
  end
end
