class User < ApplicationRecord
  has_secure_password
  has_many :transactions, dependent: :destroy
  has_many :travels, dependent: :destroy

  validates :default_currency, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  def demo_user?
    email == 'demo@expense-tracker.com'
  end
end
