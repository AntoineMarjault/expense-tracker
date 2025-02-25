require 'rails_helper'

RSpec.describe 'Transactions', type: :request do
    describe 'GET /transactions' do
        it 'returns all transactions' do
            FactoryBot.create(:transaction, name: 'train Paris - Nantes', amount: 58.62, category: 'transport', date: Time.now)
            FactoryBot.create(:transaction, name: 'restaurant Nantes', amount: 60.62, category: 'food', date: Time.now)

            get '/api/v1/transactions'

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(2)
        end
    end
end