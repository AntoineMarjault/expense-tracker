require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'POST /api/v1/signup' do
    let(:valid_params) do
      {
        user: {
          email: 'test@example.com',
          password: 'password123'
        }
      }
    end

    it 'returns 201 and creates a new user' do
      expect {
        post '/api/v1/signup', params: valid_params
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it 'returns 422 when email is missing' do
      post '/api/v1/signup', params: {
        user: { password: 'password123' }
      }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(User.count).to eq(0)
    end

    it 'returns 422 when email is already taken' do
      User.create!(valid_params[:user])

      post '/api/v1/signup', params: valid_params

      expect(response).to have_http_status(:unprocessable_entity)
      expect(User.count).to eq(1)
    end
  end
end