require 'rails_helper'

RSpec.describe 'Transactions', type: :request do
    let(:user) { FactoryBot.create(:user) }
    before { login_as(user) }

    describe 'GET /transactions' do
        it 'returns 200 and all transactions' do
            2.times { FactoryBot.create(:transaction, user: user) }

            get '/api/v1/transactions'

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(2)
        end

        it 'returns transactions ordered by date' do
            transaction1 = FactoryBot.create(:transaction, date: 2.days.ago, user: user)
            transaction2 = FactoryBot.create(:transaction, date: 1.day.ago, user: user)
            transaction3 = FactoryBot.create(:transaction, date: 3.day.ago, user: user)

            get '/api/v1/transactions'

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).first['id']).to eq(transaction2.id)
            expect(JSON.parse(response.body).second['id']).to eq(transaction1.id)
            expect(JSON.parse(response.body).last['id']).to eq(transaction3.id)
        end
    end

    describe 'POST /transactions' do
        it 'returns 201 and creates a new transaction' do
            transaction_params = {
                name: 'train Paris - Nantes',
                amount: 58.62,
                category_id: FactoryBot.create(:category).id,
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", params: transaction_params.to_json, headers: headers

            expect(response).to have_http_status(:created)
            expect(Transaction.count).to eq(1)
        end

        it 'returns 422 if the transaction is invalid' do
            transaction_params_without_amount = {
                name: 'train Paris - Nantes',
                category_id: FactoryBot.create(:category).id,
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", params: transaction_params_without_amount.to_json, headers: headers

            expect(response).to have_http_status(:unprocessable_entity)
            expect(Transaction.count).to eq(0)
        end

        it 'returns 201 and creates a transaction with EUR as a default currency if none is provided' do
            transaction_params = {
                name: 'train Paris - Nantes',
                amount: '10',
                category_id: FactoryBot.create(:category).id,
                date: Time.now
            }

            expect(Transaction.count).to eq(0)

            headers = { "CONTENT_TYPE" => "application/json" }
            post "/api/v1/transactions", params: transaction_params.to_json, headers: headers

            expect(response).to have_http_status(:created)
            expect(Transaction.count).to eq(1)
            expect(Transaction.last.amount).to eq(10)
            expect(Transaction.last.currency).to eq('EUR')
        end
    end

    describe 'GET /transactions/:id' do
        it 'returns 200 and the transaction with the given id' do
            transaction = FactoryBot.create(:transaction, user: user)

            get "/api/v1/transactions/#{transaction.id}"

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['id']).to eq(transaction.id)
        end

        it 'returns 404 if the transaction does not exist' do
            get '/api/v1/transactions/999'

            expect(response).to have_http_status(:not_found)
            expect(JSON.parse(response.body)).to eq(nil)
        end
    end

    describe 'PUT /transactions/:id' do
        it 'returns 200 and updates the transaction with the given id and returns the updated version' do
            transaction = FactoryBot.create(:transaction, name: 'Initial name', user: user)
            transaction_params = { name: 'New name' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/#{transaction.id}", params: transaction_params.to_json, headers: headers

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['name']).to eq('New name')
        end

        it 'returns 400 if the transaction is invalid' do
            transaction = FactoryBot.create(:transaction, user: user)
            transaction_params = { invalid: 'field' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/#{transaction.id}", params: transaction_params.to_json, headers: headers

            expect(response).to have_http_status(:bad_request)
        end

        it 'returns 404 if the transaction does not exist' do
            transaction_params = { name: 'new name' }

            headers = { "CONTENT_TYPE" => "application/json" }
            put "/api/v1/transactions/999", params: transaction_params.to_json, headers: headers

            expect(response).to have_http_status(:not_found)
            expect(JSON.parse(response.body)).to eq(nil)
        end
    end

    describe 'PUT /transactions/:id' do
        it 'returns 204 and deletes the transaction with given ID from DB' do
            transaction = FactoryBot.create(:transaction, user: user)
            expect(Transaction.count).to eq(1)

            delete "/api/v1/transactions/#{transaction.id}"

            expect(response).to have_http_status(:no_content)
            expect(Transaction.count).to eq(0)
        end

        it 'returns a 404 if the transaction does not exist' do
            delete "/api/v1/transactions/999"

            expect(response).to have_http_status(:not_found)
        end
    end
end
