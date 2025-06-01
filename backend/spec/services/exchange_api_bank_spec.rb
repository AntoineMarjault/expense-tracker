require 'rails_helper'
require 'webmock/rspec'

RSpec.describe ExchangeApiBank do
  let(:bank) { described_class.new }
  let(:sample_response) do
    {
      'date' => '2024-03-20',
      'eur' => {
        'usd' => 1.08,
        'gbp' => 0.85,
        'jpy' => 162.5
      }
    }
  end

  before do
    stub_request(:get, described_class::BASE_URL)
      .to_return(status: 200, body: sample_response.to_json)
  end

  describe '#update_rates' do
    it 'fetches and updates exchange rates' do
      bank.update_rates

      expect(bank.get_rate('EUR', 'USD')).to eq(1.08)
      expect(bank.get_rate('EUR', 'GBP')).to eq(0.85)
      expect(bank.get_rate('EUR', 'JPY')).to eq(162.5)
    end

    it 'calculates inverse rates' do
      bank.update_rates

      expect(bank.get_rate('USD', 'EUR')).to be_within(0.0001).of(1 / 1.08)
      expect(bank.get_rate('GBP', 'EUR')).to be_within(0.0001).of(1 / 0.85)
    end

    context 'when API request fails' do
      before do
        stub_request(:get, described_class::BASE_URL)
          .to_return(status: 500, body: 'Server Error')
      end

      it 'raises an error' do
        expect { bank.update_rates }.to raise_error(RuntimeError, /Failed to fetch rates/)
      end
    end

    context 'with caching' do
      before(:all) do
        Rails.cache = ActiveSupport::Cache::MemoryStore.new
      end

      after(:all) do
        Rails.cache.clear
      end

      it 'uses cached rates when available' do
        cached_rates = { 'USD' => 1.08, 'GBP' => 0.85 }
        Rails.cache.write(described_class::CACHE_KEY, cached_rates, expires_in: described_class::CACHE_DURATION)

        expect(Net::HTTP).not_to receive(:get_response)
        bank.update_rates

        expect(bank.get_rate('EUR', 'USD')).to eq(1.08)
        expect(bank.get_rate('EUR', 'GBP')).to eq(0.85)
      end

      it 'fetches new rates when cache expires' do
        cached_rates = { 'USD' => 1.08, 'GBP' => 0.85 }
        Rails.cache.write(described_class::CACHE_KEY, cached_rates, expires_in: 1.second)

        travel_to(2.seconds.from_now) do
          bank.update_rates
          expect(bank.get_rate('EUR', 'USD')).to eq(1.08)
          expect(WebMock).to have_requested(:get, described_class::BASE_URL)
        end
      end
    end
  end

  describe '#parse_rates' do
    it 'converts currency codes to uppercase' do
      bank.send(:parse_rates, sample_response.to_json).tap do |rates|
        expect(rates.keys).to all(match(/^[A-Z]+$/))
      end
    end
  end
end
