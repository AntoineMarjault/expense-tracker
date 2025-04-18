module Api
    module V1
        class BudgetsController < ApplicationController
          before_action :set_budget, only: [ :show, :update, :destroy ]

          def index
            @budgets = current_user.budgets.all
            render json: @budgets
          end

          def show
            render json: @budget.as_json()
          end

          def create
            @budget = current_user.budgets.build(budget_params)
            if @budget.save
              render json: @budget, status: :created
            else
              render json: @budget.errors, status: :unprocessable_entity
            end
          end

          def update
            if @budget.update(budget_params)
              render json: @budget
            else
              render json: @budget.errors, status: :unprocessable_entity
            end
          end

          def destroy
            @budget.destroy

            head :no_content
          end

          private

          def set_budget
            @budget = current_user.budgets.find_by(id: params[:id])
            render json: @budget, status: :not_found unless @budget
          end

          def budget_params
            params.require(:budget).permit(:name, :target_amount, :start_date, :end_date, :user_id, tag_ids: [], category_ids: [])
          end
        end
    end
end
