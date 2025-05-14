module Api
  module V1
    class CurrenciesController < ApplicationController
      def index
        currencies = Money::Currency.table.keys.map(&:to_s).map(&:upcase)
        render json: currencies
      end
    end
  end
end
