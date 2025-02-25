require 'rails_helper'

RSpec.describe 'Transactions', type: :request do
    describe 'GET /transactions' do
        it 'returns all transactions' do
            2.times{FactoryBot.create(:transaction)}

            get '/api/v1/transactions'

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(2)
        end
    end

    describe 'POST /transactions' do
        it 'creates a new transaction' do
            transaction_params = {
                name: 'train Paris - Nantes',
                amount: 58.62,
                category: 'transport',
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", :params => transaction_params.to_json, :headers => headers

            expect(response).to have_http_status(:created)
            expect(Transaction.count).to eq(1)
        end

        it 'returns an error if the transaction is invalid' do
            transaction_params_without_amount = {
                name: 'train Paris - Nantes',
                category: 'transport',
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", :params => transaction_params_without_amount.to_json, :headers => headers

            expect(response).to have_http_status(:unprocessable_entity)
            expect(Transaction.count).to eq(0)
        end

        it 'creates a transaction with EUR as a default currency if none is provided' do
            transaction_params = {
                name: 'train Paris - Nantes',
                amount: '10',
                category: 'transport',
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", :params => transaction_params.to_json, :headers => headers

            expect(response).to have_http_status(:created)
            expect(Transaction.count).to eq(1)
            expect(Transaction.last.amount).to eq(10)
            expect(Transaction.last.currency).to eq('EUR')
        end
    end

    describe 'GET /transactions/:id' do
        it 'returns the transaction with the given id' do
            transaction = FactoryBot.create(:transaction)

            get "/api/v1/transactions/#{transaction.id}"

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['id']).to eq(transaction.id)
        end

        it 'returns a 404 if the transaction does not exist' do
            get '/api/v1/transactions/999'

            expect(response).to have_http_status(:not_found)
            expect(JSON.parse(response.body)).to eq(nil)
        end
    end

    describe 'PUT /transactions/:id' do
        it 'updates the transaction with the given id and returns the updated version' do
            transaction = FactoryBot.create(:transaction, name: 'Initial name')
            transaction_params = { name: 'New name' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/#{transaction.id}", :params => transaction_params.to_json, :headers => headers

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['name']).to eq('New name')
        end

        it 'returns a 404 if the transaction does not exist' do
            transaction_params = { name: 'new name' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/999", :params => transaction_params.to_json, :headers => headers

            expect(response).to have_http_status(:not_found)
            expect(JSON.parse(response.body)).to eq(nil)
        end

        it 'returns an error if the transaction is invalid' do
            transaction = FactoryBot.create(:transaction)
            transaction_params = { invalid: 'field' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/#{transaction.id}", :params => transaction_params.to_json, :headers => headers

            expect(response).to have_http_status(:bad_request)
        end
    end
end