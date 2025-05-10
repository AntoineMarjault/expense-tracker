module Api
  module V1
    class CountriesController < ApplicationController
      def index
        countries = ISO3166::Country.all.map do |country|
          {
            code: country.alpha2,
            name: I18nData.countries('FR')[country.alpha2] || country.common_name,
            flag: country.emoji_flag
          }
        end

        render json: countries
      end
    end
  end
end