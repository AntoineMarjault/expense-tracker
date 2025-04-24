require 'rails_helper'

RSpec.describe 'Travels', type: :request do
  let(:user) { FactoryBot.create(:user) }
  before { login_as(user) }

  describe 'GET /travels' do
    it 'returns 200 and all travels' do
      2.times { FactoryBot.create(:travel, user: user) }

      get '/api/v1/travels'

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'POST /travels' do
    it 'returns 201 and creates a new travel' do
      travel_params = {
        name: 'Voyage Vietnam',
        target_amount: 5000,
        start_date: 1.month.from_now,
        end_date: 2.months.from_now
      }

      expect(Travel.count).to eq(0)

      headers = { "CONTENT_TYPE" => "application/json" }
      post "/api/v1/travels", params: travel_params.to_json, headers: headers

      expect(response).to have_http_status(:created)
      expect(Travel.count).to eq(1)
    end

    it 'returns 422 if the travel is invalid' do
      travel_params_without_name = {
        target_amount: 5000,
        start_date: 1.month.from_now,
        end_date: 2.months.from_now
      }

      expect(Travel.count).to eq(0)

      headers = { "CONTENT_TYPE" => "application/json" }
      post "/api/v1/travels", params: travel_params_without_name.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
      expect(Travel.count).to eq(0)
    end
  end

  describe 'GET /travels/:id' do
    it 'returns 200 and the travel with the given id' do
      travel = FactoryBot.create(:travel, user: user)

      get "/api/v1/travels/#{travel.id}"

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(travel.id)
    end

    it 'returns 404 if the travel does not exist' do
      get '/api/v1/travels/999'

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'PUT /travels/:id' do
    it 'returns 200 and updates the travel with the given id' do
      travel = FactoryBot.create(:travel, name: 'Initial name', user: user)
      travel_params = { name: 'New name' }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/travels/#{travel.id}", params: travel_params.to_json, headers: headers

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['name']).to eq('New name')
    end

    it 'returns 422 if the travel is invalid' do
      travel = FactoryBot.create(:travel, user: user)
      travel_params = { target_amount: -100 }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/travels/#{travel.id}", params: travel_params.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'returns 404 if the travel does not exist' do
      travel_params = { name: 'new name' }

      headers = { "CONTENT_TYPE" => "application/json" }
      put "/api/v1/travels/999", params: travel_params.to_json, headers: headers

      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'DELETE /travels/:id' do
    it 'returns 204 and deletes the travel with given ID from DB' do
      travel = FactoryBot.create(:travel, user: user)
      expect(Travel.count).to eq(1)

      delete "/api/v1/travels/#{travel.id}"

      expect(response).to have_http_status(:no_content)
      expect(Travel.count).to eq(0)
    end

    it 'returns a 404 if the travel does not exist' do
      delete "/api/v1/travels/999"

      expect(response).to have_http_status(:not_found)
    end
  end
end
