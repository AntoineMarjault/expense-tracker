class Api::V1::TagsController < ApplicationController
    def index
        render json: current_user.tags
    end
end
