module Api
    module V1
        class UsersController < ApplicationController
            skip_before_action :authenticate_request, only: :create

            def create
                user = User.new(user_params)

                if user.save
                    head :created
                else
                    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
                end
            end

            private

            def user_params
               params.require(:user).permit(:email, :password)
            end
        end
    end
end
