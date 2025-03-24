require 'rails_helper'

RSpec.describe 'Budgets', type: :request do
  let(:user) { FactoryBot.create(:user) }
  before { login_as(user) }

  describe 'GET /budgets' do
    it 'returns 200 and all budgets' do
      2.times { FactoryBot.create(:budget, user: user) }

      get '/api/v1/budgets'

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'POST /budgets' do
    it 'returns 201 and creates a new budget' do
      budget_params = {
        name: 'Voyage Vietnam',
        target_amount: 5000,
        start_date: 1.month.from_now,
        end_date: 2.months.from_now
      }

      expect(Budget.count).to eq(0)

      headers = { "CONTENT_TYPE" => "application/json" }
      post "/api/v1/budgets", params: budget_params.to_json, headers: headers

      expect(response).to have_http_status(:created)
      expect(Budget.count).to eq(1)
    end

    it 'returns 422 if the budget is invalid' do
      budget_params_without_name = {
        target_amount: 5000,
        start_date: 1.month.from_now,
        end_date: 2.months.from_now
      }

      expect(Budget.count).to eq(0)

      headers = { "CONTENT_TYPE" => "application/json" }
      post "/api/v1/budgets", params: budget_params_without_name.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
      expect(Budget.count).to eq(0)
    end
  end

  describe 'GET /budgets/:id' do
    it 'returns 200 and the budget with the given id' do
      budget = FactoryBot.create(:budget, user: user)

      get "/api/v1/budgets/#{budget.id}"

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(budget.id)
    end

    it 'returns 404 if the budget does not exist' do
      get '/api/v1/budgets/999'

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'PUT /budgets/:id' do
    it 'returns 200 and updates the budget with the given id' do
      budget = FactoryBot.create(:budget, name: 'Initial name', user: user)
      budget_params = { name: 'New name' }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/budgets/#{budget.id}", params: budget_params.to_json, headers: headers

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['name']).to eq('New name')
    end

    it 'returns 422 if the budget is invalid' do
      budget = FactoryBot.create(:budget, user: user)
      budget_params = { target_amount: -100 }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/budgets/#{budget.id}", params: budget_params.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'returns 404 if the budget does not exist' do
      budget_params = { name: 'new name' }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/budgets/999", params: budget_params.to_json, headers: headers

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'DELETE /budgets/:id' do
    it 'returns 204 and deletes the budget with given ID from DB' do
      budget = FactoryBot.create(:budget, user: user)
      expect(Budget.count).to eq(1)

      delete "/api/v1/budgets/#{budget.id}"

      expect(response).to have_http_status(:no_content)
      expect(Budget.count).to eq(0)
    end

    it 'returns a 404 if the budget does not exist' do
      delete "/api/v1/budgets/999"

      expect(response).to have_http_status(:not_found)
    end
  end
end
