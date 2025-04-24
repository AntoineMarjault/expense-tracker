module Api
  module V1
    class TransactionsController < ApplicationController
      def index
        render json: current_user.transactions.order(date: :desc)
      end

      def show
        transaction = current_user.transactions.find_by(id: params[:id])

        if transaction
          render json: transaction
        else
          render json: transaction, status: :not_found
        end
      end

      def create
        transaction = current_user.transactions.build(transaction_params)

        if location_params[:latitude].present? && location_params[:longitude].present?
          transaction.build_location(location_params)
        end

        if transaction.save
          handle_tags(transaction, tags_param)
          render json: transaction, status: :created
        else
          render json: transaction.errors, status: :unprocessable_entity
        end
      end

      def update
        transaction = current_user.transactions.find_by(id: params[:id])

        return render json: transaction, status: :not_found unless transaction

        if transaction.update(transaction_params)
          handle_tags(transaction, tags_param)
          render json: transaction
        else
          render json: transaction.errors, status: :unprocessable_entity
        end
      end

      def destroy
        transaction = current_user.transactions.find_by(id: params[:id])

        return render json: transaction, status: :not_found unless transaction

        transaction.destroy!
      end

      private

      def handle_tags(transaction, tag_names)
        return unless tag_names

        tags = tag_names.map do |name|
          current_user.tags.find_or_create_by(name: name)
        end

        transaction.tags = tags
      end

      def transaction_params
        params.require(:transaction).permit(:amount, :category_id, :currency, :date, :name)
      end

      def tags_param
        params.require(:transaction).permit(tags: [])[:tags]
      end

      def location_params
        params.require(:transaction).permit(:latitude, :longitude)
      end
    end
  end
end
