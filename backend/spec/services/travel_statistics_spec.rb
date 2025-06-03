require 'rails_helper'

RSpec.describe TravelStatistics do
  let(:user) { FactoryBot.create(:user) }
  let(:start_date) { Date.new(2024, 1, 1) }

  describe '#compute' do
    context 'with no transactions' do
      it 'returns default values' do
        result = build_statistics(start_date: start_date, end_date: start_date + 3.days, target_amount: 100).compute

        expect(result[:spent_amount]).to eq(0)
        expect(result[:remaining_amount]).to eq(100)
        expect(result[:progress_percentage]).to eq(0.0)
        expect(result[:daily_spending_target]).to eq(25) # 100 / 4 days
        expect(result[:average_daily_spending]).to eq(0.0)
        expect(result[:daily_cumulative_spending]).to eq([
          { cumulative_amount: 0, date: start_date, target_amount: 25 },
          { cumulative_amount: 0, date: start_date + 1.day, target_amount: 50 },
          { cumulative_amount: 0, date: start_date + 2.days, target_amount: 75 },
          { cumulative_amount: 0, date: start_date + 3.days, target_amount: 100 },
        ])
        expect(result[:expenses_per_category]).to eq([])
        expect(result[:average_daily_spending_per_country]).to eq({})
      end
    end

    context 'with transactions in multiple countries' do
      it 'calculates spending statistics correctly' do
        food_category = FactoryBot.create(:category, name: 'Food')
        transport_category = FactoryBot.create(:category, name: 'Transport')
        FactoryBot.create(:transaction, user: user, amount: 10, date: start_date, country_code: 'FR', category: food_category)
        FactoryBot.create(:transaction, user: user, amount: 20, date: start_date + 1.day, country_code: 'GR', category: transport_category)

        result = build_statistics(start_date: start_date, end_date: start_date + 3.days, target_amount: 100).compute

        expect(result[:spent_amount]).to eq(30)
        expect(result[:remaining_amount]).to eq(70)
        expect(result[:progress_percentage]).to eq(30.0)
        expect(result[:daily_spending_target]).to eq(25) # 100 / 4 days
        expect(result[:average_daily_spending]).to eq(7.5) # 30 / 4 days
        expect(result[:daily_cumulative_spending]).to eq([
          { cumulative_amount: 10, date: start_date, target_amount: 25 },
          { cumulative_amount: 30, date: start_date + 1.day, target_amount: 50 },
          { cumulative_amount: 30, date: start_date + 2.days, target_amount: 75 },
          { cumulative_amount: 30, date: start_date + 3.days, target_amount: 100 },
        ])

        expect(result[:expenses_per_category].length).to eq(2)
        expect(result[:expenses_per_category][0][:category_name]).to eq('Transport')
        expect(result[:expenses_per_category][0][:total_expense]).to eq(20)
        expect(result[:expenses_per_category][1][:category_name]).to eq('Food')
        expect(result[:expenses_per_category][1][:total_expense]).to eq(10)

        expect(result[:average_daily_spending_per_country]).to eq({
          'FR' => 0.5e1, # 10 / 2 days
          'GR' => 0.667e1, # 20 / 3 days
        })
        expect(result[:daily_cumulative_spending].length).to eq(4)
        expect(result[:daily_cumulative_spending][0][:cumulative_amount]).to eq(10)
        expect(result[:daily_cumulative_spending][1][:cumulative_amount]).to eq(30)
        expect(result[:daily_cumulative_spending][2][:cumulative_amount]).to eq(30) # No transactions
        expect(result[:daily_cumulative_spending][3][:cumulative_amount]).to eq(30) # No transactions
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