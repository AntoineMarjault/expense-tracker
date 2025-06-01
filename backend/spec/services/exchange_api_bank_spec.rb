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
  end

  describe '#parse_rates' do
    it 'converts currency codes to uppercase' do
      bank.send(:parse_rates, sample_response.to_json).tap do |rates|
        expect(rates.keys).to all(match(/^[A-Z]+$/))
      end
    end
  end
end
