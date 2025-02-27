class Api::V1::CategoriesController < ApplicationController
    def index
        render json: Category.all
    end

    def show
        category = Category.find_by(id: params[:id])

        if category
            render json: category
        else
            render json: category, status: :not_found
        end
    end
end
