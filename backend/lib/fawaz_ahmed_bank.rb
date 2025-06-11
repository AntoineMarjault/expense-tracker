require 'net/http'
require 'json'

class FawazAhmedBank < Money::Bank::VariableExchange
  API_ENDPOINT = 'https://latest.currency-api.pages.dev/v1/currencies/eur.json'
  CACHE_KEY = 'fawaz_ahmed_exchange_rates'
  CACHE_DURATION = 12.hours
  TIMEOUT = 10

  def initialize(store = Money::RatesStore::Memory.new)
    super(store)
    @mutex = Mutex.new
    @last_update = nil
  end

  def update_rates
    @mutex.synchronize do
      return if rates_up_to_date?

      rates_data = fetch_rates
      return unless rates_data

      clear_existing_rates
      populate_rates(rates_data)

      @last_update = Time.current
      cache_rates(rates_data)

      Rails.logger.info "Successfully updated #{rate_count} exchange rates"
    end
  rescue StandardError => e
    Rails.logger.error "Failed to update exchange rates: #{e.message}"
    # Don't re-raise to allow fallback to cached rates
  end

  def exchange_with(from, to)
    update_rates unless rates_available?
    super(from, to)
  end

  def get_rate(from, to)
    update_rates unless rates_available?
    super(from, to)
  end

  def rates_up_to_date?
    @last_update && @last_update > CACHE_DURATION.ago
  end

  private

  def fetch_rates
    cached_data = Rails.cache.read(CACHE_KEY)
    return JSON.parse(cached_data) if cached_data

    api_data = fetch_from_api
    JSON.parse(api_data)
  end

  def fetch_from_api
    uri = URI(API_ENDPOINT)

    Net::HTTP.start(uri.host, uri.port, use_ssl: true,
                    open_timeout: TIMEOUT, read_timeout: TIMEOUT) do |http|
      request = Net::HTTP::Get.new(uri)
      request['User-Agent'] = 'ExpenseTracker/1.0 Ruby'
      request['Accept'] = 'application/json'

      response = http.request(request)

      raise "HTTP #{response.code}: #{response.message}" unless response.code == '200'

      response.body
    end
  end

  def clear_existing_rates
    # Clear only EUR-based rates to avoid conflicts
    store.marshal_dump.keys.each do |key|
      from, to = key.split(Money::RatesStore::Memory::SEPARATOR)
      store.remove_rate(from, to) if from == 'EUR' || to == 'EUR'
    end
  end

  def populate_rates(rates_data)
    rates_data.dig('eur')&.each do |currency_code, rate|
      next unless valid_rate?(rate)

      currency_code = currency_code.upcase
      add_rate('EUR', currency_code, rate)
      add_rate(currency_code, 'EUR', 1.0 / rate)
    end
  end

  def valid_rate?(rate)
    rate.is_a?(Numeric) && rate > 0 && rate.finite?
  end

  def cache_rates(data)
    Rails.cache.write(CACHE_KEY, data.to_json, expires_in: CACHE_DURATION)
  end

  def rates_available?
    @last_update || store.marshal_dump.any?
  end

  def rate_count
    store.marshal_dump.count
  end
end
