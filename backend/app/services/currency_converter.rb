class CurrencyConverter
  MAX_RETRIES = 1
  ConversionError = Class.new(StandardError)

  def initialize(bank: ExchangeApiBank.new)
    @bank = bank
    ensure_rates_updated
  end

  def convert(amount:, from:, to:)
    return amount if from == to

    Money.default_bank = @bank
    convert_amount(amount, from, to)
  rescue Money::Bank::UnknownRate => e
    handle_unknown_rate(e) { convert_amount(amount, from, to) }
  end

  private

  def convert_amount(amount, from, to)
    Money.new(amount * 100, from).exchange_to(to).to_f
  end

  def ensure_rates_updated
    @bank.update_rates
  end

  def handle_unknown_rate(error)
    @retries ||= 0
    if @retries < MAX_RETRIES
      @retries += 1
      ensure_rates_updated
      yield
    else
      raise ConversionError, "Failed to convert currency after #{MAX_RETRIES} attempts"
    end
  end
end