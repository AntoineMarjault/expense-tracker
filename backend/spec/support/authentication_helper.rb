module AuthenticationHelper
  def login_as(user)
    token = JwtService.encode(user_id: user.id)
    @auth_headers = { 'Authorization' => "Bearer #{token}" }
  end

  # Override the default RSpec process method to include headers
  def process(method, path, params: {}, headers: {}, **options)
    super(method, path, params: params, headers: headers.merge(@auth_headers || {}), **options)
  end

  # Override the get/post/put/patch/delete methods
  %w[get post patch put delete head].each do |http_method|
    define_method(http_method) do |path, **args|
      args[:headers] = (args[:headers] || {}).merge(@auth_headers || {})
      super(path, **args)
    end
  end
end
