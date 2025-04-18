class Tag < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :financial_transactions, class_name: 'Transaction', join_table: 'tags_transactions'

  validates :name, presence: true, uniqueness: { scope: :user_id }

  def as_json(options = {})
    super(only: [:id, :name])
  end
end

