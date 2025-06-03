require 'rails_helper'

RSpec.describe TravelStatistics do
  let(:user) { FactoryBot.create(:user) }
  let(:start_date) { Date.new(2024, 1, 1) }

  describe '#compute' do
    context 'with no transactions' do
      it 'returns default values' do
      end
    end

    context 'with transactions in multiple countries' do
      it 'calculates spending statistics correctly' do
      end

      it 'calculates average daily spending per country correctly' do
      end
    end
  end

  describe '#spent_amount' do
    it 'returns the sum of all transactions within the travel period' do
      FactoryBot.create(:transaction, user: user, amount: 10, date: start_date)
      FactoryBot.create(:transaction, user: user, amount: 10, date: start_date + 1.day)
      FactoryBot.create(:transaction, user: user, amount: 10, date: start_date + 1.month)

      result = build_statistics(start_date: start_date, end_date: start_date + 1.week, target_amount: 100).compute

      expect(result[:spent_amount]).to eq(20)
    end

    it 'computes the spent amount only on transactions created by the user' do
      other_user = FactoryBot.create(:user)
      FactoryBot.create(:transaction, user: user, amount: 10, date: start_date)
      FactoryBot.create(:transaction, user: other_user, amount: 10, date: start_date)

      result = build_statistics(start_date: start_date, end_date: start_date + 1.day, target_amount: 100).compute

      expect(result[:spent_amount]).to eq(10)
    end
  end

  describe '#remaining_amount' do
  end

  describe '#progress_percentage' do
  end

  describe '#daily_spending_target' do
  end

  describe '#average_daily_spending' do
  end

  describe '#daily_cumulative_spending' do
    it 'calculates daily cumulative spending correctly' do
      FactoryBot.create(:transaction, user: user, amount: 10, date: start_date)
      FactoryBot.create(:transaction, user: user, amount: 20, date: start_date + 1.day)

      result = build_statistics(start_date: start_date, end_date: start_date + 2.days, target_amount: 100).compute[:daily_cumulative_spending]

      expect(result.length).to eq(3)
      expect(result[0][:cumulative_amount]).to eq(10)
      expect(result[1][:cumulative_amount]).to eq(30)
      expect(result[2][:cumulative_amount]).to eq(30) # No transaction on the last day
    end
  end

  describe '#expenses_per_category' do
  end

  describe '#average_daily_spending_per_country' do
  end

  describe '#split_into_periods_per_country' do
    let(:statistics_end_date) { start_date + 7.days }

    shared_examples 'periods calculation' do
      it 'returns correctly split periods' do
        FactoryBot.create(:transaction, user: user, amount: 10, date: start_date, country_code: 'FR')
        FactoryBot.create(:transaction, user: user, amount: 30, date: start_date + 2.days, country_code: 'GR')

        transactions = Transaction.where(user: user, date: start_date..statistics_end_date)
        result = build_statistics(
          start_date: start_date,
          end_date: statistics_end_date,
          target_amount: 100,
        ).send(:split_into_periods_per_country, transactions: transactions)

        expect(result.length).to eq(2)
        expect(result[0][:country]).to eq('FR')
        expect(result[0][:period]).to eq(start_date..start_date + 2.days)
        expect(result[1][:country]).to eq('GR')
        expect(result[1][:period]).to eq((start_date + 2.days)..expected_end_date)
      end
    end

    context 'when travel is finished' do
      let(:expected_end_date) { statistics_end_date }
      include_examples 'periods calculation'
    end

    context 'when travel is ongoing' do
      let(:expected_end_date) { Date.current }
      around { |example| travel_to(start_date + 5.days) { example.run } }
      include_examples 'periods calculation'
    end
  end

  def build_statistics(start_date:, end_date:, target_amount:)
    transactions = Transaction.where(user: user, date: start_date..end_date)

    described_class.new(
      start_date: start_date,
      end_date: end_date,
      target_amount: target_amount,
      transactions: transactions
    )
  end
end