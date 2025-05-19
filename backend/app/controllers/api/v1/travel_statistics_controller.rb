module Api
  module V1
    class TravelStatisticsController < ApplicationController
      before_action :set_travel, only: [:show]

      def show
        travel_start_date = @travel.start_date
        travel_end_date = @travel.end_date
        user_transactions_within_travel_period = Transaction.where(user_id: @travel.user_id, date: travel_start_date..travel_end_date)

        statistics = TravelStatistics.new(
          start_date: travel_start_date,
          end_date: travel_end_date,
          target_amount: @travel.target_amount,
          transactions: user_transactions_within_travel_period
        ).compute
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