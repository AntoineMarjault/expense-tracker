require 'rails_helper'

RSpec.describe 'Login', type: :request do
  describe 'POST /api/v1/login' do
    let(:user) { User.create(email: 'test@example.com', password: 'password123') }

    it 'returns 200 with a JWT token with valid credentials' do
      post '/api/v1/login', params: {
        user: { email: user.email, password: user.password }
      }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to have_key('token')
    end

    it 'returns 401 unauthorized with invalid credentials' do
      post '/api/v1/login', params: {
        user: { email: user.email, password: 'wrong' }
      }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns 401 unauthorized for unknown email' do
        post '/api/v1/login', params: {
            user: { email: 'unknown@email.com', password: user.password }
        }
        expect(response).to have_http_status(:unauthorized)
    end
  end
end