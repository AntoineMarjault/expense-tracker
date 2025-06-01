class CurrencyConverter
  MAX_RETRIES = 1
  ConversionError = Class.new(StandardError)

  def initialize(bank: ExchangeApiBank.new)
    @bank = bank
    ensure_rates_updated
  end

  def convert(amount:, from:, to:)
    return amount if from == to

    retries = 0
    Money.default_bank = @bank

    begin
      convert_amount(amount, from, to)
    rescue Money::Bank::UnknownRate => e
      if retries < MAX_RETRIES
        retries += 1
        ensure_rates_updated
        retry
      else
        raise ConversionError, "Failed to convert currency after #{MAX_RETRIES} attempts: #{e.message}"
      end
    end
  end

  private

  def convert_amount(amount, from, to)
    Money.new(amount * 100, from).exchange_to(to).to_f
  end

  def ensure_rates_updated
    @bank.update_rates
  end
end