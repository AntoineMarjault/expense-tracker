class JwtService
  EXPIRY = 24.hours.to_i

  def self.encode(payload)
    payload[:exp] = Time.now.to_i + EXPIRY
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end
end