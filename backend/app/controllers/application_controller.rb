class ApplicationController < ActionController::API
  before_action :authenticate_request
  
  private
  
  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded_token = JwtService.decode(token)
    
    if decoded_token
      @current_user = User.find(decoded_token['user_id'])
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
  
  def current_user
    @current_user
  end
end