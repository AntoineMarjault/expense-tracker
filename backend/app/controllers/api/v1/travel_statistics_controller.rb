module Api
  module V1
    class TravelStatisticsController < ApplicationController
      before_action :set_travel, only: [:show]

      def show
        statistics = TravelStatistics.new(@travel).compute
        render json: statistics
      end

      private

      def set_travel
        @travel = current_user.travels.find_by(id: params[:id])
        render json: @travel, status: :not_found unless @travel
      end
    end
  end
end