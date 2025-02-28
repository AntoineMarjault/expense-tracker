module Api
    module V1
        class AuthenticationsController < ApplicationController
            skip_before_action :authenticate_request, only: :create

            def create
                user = User.find_by(email: authentication_params[:email])

                if user&.authenticate(authentication_params[:password])
                    token = JwtService.encode(user_id: user.id)
                    render json: { token: token }
                else
                    render json: { error: 'Invalid email or password' }, status: :unauthorized
                end
            end

            private

            def authentication_params
               params.require(:user).permit(:email, :password)
            end
        end
    end
end