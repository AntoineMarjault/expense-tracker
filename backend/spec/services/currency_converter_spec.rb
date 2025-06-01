require 'rails_helper'

RSpec.describe CurrencyConverter do
  let(:mock_bank) { instance_double('ExchangeApiBank') }
  let(:currency_converter) { described_class.new(bank: mock_bank) }

  before do
    allow(mock_bank).to receive(:update_rates)
  end

  describe '#convert' do
    before do
      allow(Money).to receive(:default_bank=)
    end

    it 'returns the original amount when currencies are the same' do
      result = currency_converter.convert(amount: 100.0, from: 'USD', to: 'USD')
      expect(result).to eq(100.0)
    end

    it 'converts between different currencies' do
      allow(Money).to receive(:new).with(10000, 'USD').and_return(
        instance_double('Money', exchange_to: instance_double('Money', to_f: 85.0))
      )

      result = currency_converter.convert(amount: 100.0, from: 'USD', to: 'EUR')
      expect(result).to eq(85.0)
    end

    context 'when rate is initially unknown' do
      it 'retries once after updating rates' do
        call_count = 0
        allow(Money).to receive(:new) do
          call_count += 1
          raise Money::Bank::UnknownRate if call_count == 1
          instance_double('Money', exchange_to: instance_double('Money', to_f: 85.0))
        end

        result = currency_converter.convert(amount: 100.0, from: 'USD', to: 'EUR')
        expect(result).to eq(85.0)
        expect(mock_bank).to have_received(:update_rates).twice
      end

      it 'raises ConversionError after max retries' do
        allow(Money).to receive(:new).and_raise(Money::Bank::UnknownRate)

        expect {
          currency_converter.convert(amount: 100.0, from: 'USD', to: 'EUR')
        }.to raise_error(CurrencyConverter::ConversionError, /Failed to convert currency after 1 attempts/)
      end
    end
  end
end
