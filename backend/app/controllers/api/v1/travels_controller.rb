module Api
  module V1
    class TravelsController < ApplicationController
      before_action :set_travel, only: [ :show, :update, :destroy ]

      def index
        @travels = current_user.travels.all
        render json: @travels
      end

      def show
        render json: @travel
      end

      def create
        @travel = current_user.travels.build(travel_params)
        if @travel.save
          render json: @travel, status: :created
        else
          render json: @travel.errors, status: :unprocessable_entity
        end
      end

      def update
        if @travel.update(travel_params)
          render json: @travel
        else
          render json: @travel.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @travel.destroy

        head :no_content
      end

      private

      def set_travel
        @travel = current_user.travels.find_by(id: params[:id])
        render json: @travel, status: :not_found unless @travel
      end

      def travel_params
        params.require(:travel).permit(:name, :target_amount, :start_date, :end_date, :user_id)
      end
    end
  end
end
