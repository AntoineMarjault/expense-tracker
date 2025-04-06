# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)

# Create default categories
Category.find_or_create_by!(name: 'Abonnements', color: '#E6D7B9', emoji: '📰')
Category.find_or_create_by!(name: 'Achats', color: '#D8A7B1', emoji: '🛍️')
Category.find_or_create_by!(name: 'Activités', color: '#B6C8E8', emoji: '🎭')
Category.find_or_create_by!(name: 'Alimentation', color: '#A7CEAB', emoji: '🍎')
Category.find_or_create_by!(name: 'Assurances', color: '#B0A9C8', emoji: '🛡️')
Category.find_or_create_by!(name: 'Divers', color: '#C2B8AD', emoji: '🔮')
Category.find_or_create_by!(name: 'Essence', color: '#E8A990', emoji: '⛽')
Category.find_or_create_by!(name: 'Hébergement', color: '#9BCBBB', emoji: '🏨')
Category.find_or_create_by!(name: 'Parking', color: '#92D3DB', emoji: '🅿️')
Category.find_or_create_by!(name: 'Péage', color: '#E8DC81', emoji: '🛣️')
Category.find_or_create_by!(name: 'Restaurants et bar', color: '#E8BBA9', emoji: '🍽️')
Category.find_or_create_by!(name: 'Transport', color: '#A9D6E0', emoji: '🚆')
