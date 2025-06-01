require 'net/http'
require 'json'


# TODO: Add caching
# TODO: Add error handling
# TODO: Add tests
class ExchangeApiBank < Money::Bank::VariableExchange
  BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'

  def initialize(store = Money::RatesStore::Memory.new)
    super(store)
  end

  def update_rates
    response = fetch_rates_from_api
    rates = parse_rates(response)
    clear_rates!
    populate_rates(rates)
  end

  private

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

  def populate_rates(rates)
    rates.each do |currency, rate|
      next unless Money::Currency.find(currency)
      store.add_rate('EUR', currency, rate)
      store.add_rate(currency, 'EUR', 1.0 / rate) if rate != 0
    end

    binding.break
  end
end