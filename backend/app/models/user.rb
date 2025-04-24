class User < ApplicationRecord
    has_secure_password
    has_many :transactions, dependent: :destroy
    has_many :travels, dependent: :destroy
    has_many :tags, dependent: :destroy

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
