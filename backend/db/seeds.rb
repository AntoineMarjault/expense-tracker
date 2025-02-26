# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)

# Create default categories
Category.find_or_create_by!(name: 'Abonnements', color: '#FFD700', emoji: '📰')
Category.find_or_create_by!(name: 'Achats', color: '#FF69B4', emoji: '🛍️')
Category.find_or_create_by!(name: 'Activités', color: '#87CEEB', emoji: '🎭')
Category.find_or_create_by!(name: 'Alimentation', color: '#32CD32', emoji: '🍎')
Category.find_or_create_by!(name: 'Assurances', color: '#4169E1', emoji: '🛡️')
Category.find_or_create_by!(name: 'Divers', color: '#A9A9A9', emoji: '🔮')
Category.find_or_create_by!(name: 'Essence', color: '#FF4500', emoji: '⛽')
Category.find_or_create_by!(name: 'Hébergement', color: '#8A2BE2', emoji: '🏨')
Category.find_or_create_by!(name: 'Parking', color: '#1E90FF', emoji: '🅿️')
Category.find_or_create_by!(name: 'Péage', color: '#FFA500', emoji: '🛣️')
Category.find_or_create_by!(name: 'Restaurants et bar', color: '#DC143C', emoji: '🍽️')
Category.find_or_create_by!(name: 'Transport', color: '#4682B4', emoji: '🚆')
