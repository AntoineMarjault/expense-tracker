module Api
    module V1
        class TransactionsController < ApplicationController
            def index
                render json: Transaction.all
            end

            def show
                transaction = Transaction.find_by(id: params[:id])

                if transaction
                    render json: transaction
                else
                    render json: transaction, status: :not_found
                end
            end

            def create
                transaction = Transaction.new(transaction_params)

                if transaction.save
                    render json: transaction, status: :created
                else
                    render json: transaction.errors, status: :unprocessable_entity
                end
            end

            def update
                transaction = Transaction.find_by(id: params[:id])

                return render json: transaction, status: :not_found unless transaction

                if transaction.update(transaction_params)
                    render json: transaction
                else
                    render json: transaction.errors, status: :unprocessable_entity
                end
            end

            def destroy
                transaction = Transaction.find_by(id: params[:id])

                return render json: transaction, status: :not_found unless transaction

                transaction.destroy!
            end

            private

            def transaction_params
                params.require(:transaction).permit(:amount, :category_id, :currency, :date, :name)
            end
        end
    end
end