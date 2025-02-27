require 'rails_helper'

RSpec.describe "Api::V1::Categories", type: :request do
    describe "GET /index" do
        it "returns 200 and all categories" do
            2.times{FactoryBot.create(:category)}

            get '/api/v1/categories'

            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(2)
        end
    end

    describe 'GET /categories/:id' do
        it 'returns 200 and the category with the given id' do
          category = FactoryBot.create(:category)

          get "/api/v1/categories/#{category.id}"

          expect(response).to have_http_status(:success)
          expect(JSON.parse(response.body)['id']).to eq(category.id)
        end

        it 'returns 404 if the category does not exist' do
          get '/api/v1/categories/999'

          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)).to eq(nil)
        end
    end
end
