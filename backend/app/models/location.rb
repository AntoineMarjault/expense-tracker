class Location < ApplicationRecord
  has_one :financial_transaction, class_name: 'Transaction'

  validates :latitude, presence: true, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :longitude, presence: true, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }
  validates :country_code, length: { is: 2 }, allow_nil: true

  reverse_geocoded_by :latitude, :longitude do |obj, results|
    if geo = results.first
      obj.country_code = geo.country_code
      obj.place_name = geo.city || geo.address
    end
  end
  after_validation :reverse_geocode

  def country_name
    Geocoder.search([latitude, longitude]).first&.country
  end

  def country_flag
    return nil unless country_code
    country_code.upcase.chars.map { |c| (c.ord + 127397).chr(Encoding::UTF_8) }.join
  end
end