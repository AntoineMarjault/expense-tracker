class RemoveUnusuedTables < ActiveRecord::Migration[8.0]
  def up
    drop_table :tags_transactions
    drop_table :categories_travels
    drop_table :tags_travels
    remove_foreign_key :tags, :users
    drop_table :tags
  end

  def down
    create_table :tags do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    create_table :tags_transactions, id: false do |t|
      t.bigint :transaction_id, null: false
      t.bigint :tag_id, null: false
      t.index [:tag_id, :transaction_id]
      t.index [:transaction_id, :tag_id]
    end

    create_table :categories_travels, id: false do |t|
      t.bigint :travel_id, null: false
      t.bigint :category_id, null: false
      t.index [:category_id, :travel_id], name: 'index_budgets_categories_on_category_id_and_budget_id'
      t.index [:travel_id, :category_id], name: 'index_budgets_categories_on_budget_id_and_category_id'
    end

    create_table :tags_travels, id: false do |t|
      t.bigint :travel_id, null: false
      t.bigint :tag_id, null: false
      t.index [:tag_id, :travel_id], name: 'index_budgets_tags_on_tag_id_and_budget_id'
      t.index [:travel_id, :tag_id], name: 'index_budgets_tags_on_budget_id_and_tag_id'
    end
  end
end