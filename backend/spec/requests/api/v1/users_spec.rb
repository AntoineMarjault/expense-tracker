require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'POST /signup' do
    it 'returns 201 and creates a new user' do
      user_params = {
        user: {
          email: 'user1@email.com',
          password: 'secured_password'
        }
      }

      expect(User.count).to eq(0)

      headers = { "CONTENT_TYPE" => "application/json" }
      post "/api/v1/signup", params: user_params.to_json, headers: headers

      expect(response).to have_http_status(:created)
      expect(User.count).to eq(1)
    end
  end

  describe 'DELETE /users' do
    it 'returns 204 and deletes the user' do
      user = FactoryBot.create(:user)
      login_as(user)

      expect {
        delete "/api/v1/users/#{user.id}"
      }.to change { User.count }.by(-1)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns 401 if the user being deleted is not the one logged in' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      login_as(user1)

      delete "/api/v1/users/#{user2.id}"

      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns 401 if the user is not logged in' do
      user = FactoryBot.create(:user)

      delete "/api/v1/users/#{user.id}"

      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns 422 if the user cannot be deleted' do
      user = FactoryBot.create(:user)
      login_as(user)

      allow_any_instance_of(Api::V1::UsersController).to receive(:current_user).and_return(user)
      allow(user).to receive(:destroy).and_return(false)

      delete "/api/v1/users/#{user.id}"

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end