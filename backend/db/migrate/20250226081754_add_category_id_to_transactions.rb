class AddCategoryIdToTransactions < ActiveRecord::Migration[8.0]
  def change
    add_reference :transactions, :category, null: false, foreign_key: true
  end
end
