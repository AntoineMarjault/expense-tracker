module Api
    module V1
        class TransactionsController < ApplicationController
            def index
                render json: Transaction.all
            end
        end
    end
end