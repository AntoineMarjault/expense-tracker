require 'net/http'
require 'json'

class ExchangeApiBank < Money::Bank::VariableExchange
  BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
  CACHE_KEY = 'currencies_exchange_rates'
  CACHE_DURATION = 12.hours

  def initialize(store = Money::RatesStore::Memory.new)
    super(store)
    @mutex = Mutex.new
  end

  def update_rates
    @mutex.synchronize do
      begin
        rates = fetch_rates
        return unless rates

        clear_rates!
        populate_rates(rates)
      rescue StandardError => e
        Rails.logger.error "Failed to update exchange rates: #{e.message}"
        raise
      end
    end
  end

  private

  def fetch_rates
    cached_data = Rails.cache.read(CACHE_KEY)
    return cached_data if cached_data

    response = fetch_rates_from_api
    rates = parse_rates(response)
    cache_rates(rates)
    rates
  end

  def fetch_rates_from_api
    uri = URI(BASE_URL)
    response = Net::HTTP.get_response(uri)
    if response.is_a?(Net::HTTPSuccess)
      response.body
    else
      raise "Failed to fetch rates: #{response.message}"
    end
  end

  def parse_rates(response_body)
    data = JSON.parse(response_body)
    rates = data['eur']

    rates.each_with_object({}) do |(currency, rate), hash|
      hash[currency.upcase] = rate.to_f
    end
  end

  def clear_rates!
    store.each_rate do |iso_from, iso_to|
      add_rate(iso_from, iso_to, nil)
    end
  end

  def cache_rates(rates)
    Rails.cache.write(CACHE_KEY, rates, expires_in: CACHE_DURATION)
  end

  def populate_rates(rates)
    rates.each do |currency, rate|
      next unless Money::Currency.find(currency)
      next unless rate.positive? && rate.finite?

      store.add_rate('EUR', currency, rate)
      store.add_rate(currency, 'EUR', 1.0 / rate)
    end
  end
end