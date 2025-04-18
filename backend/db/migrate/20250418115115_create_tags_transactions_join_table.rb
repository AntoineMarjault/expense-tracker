class CreateTagsTransactionsJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :transactions, :tags do |t|
      t.index [:transaction_id, :tag_id]
      t.index [:tag_id, :transaction_id]
    end
  end
end