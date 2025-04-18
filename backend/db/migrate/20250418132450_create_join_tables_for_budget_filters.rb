class CreateJoinTablesForBudgetFilters < ActiveRecord::Migration[8.0]
  def change
    create_join_table :budgets, :tags do |t|
      t.index [:budget_id, :tag_id]
      t.index [:tag_id, :budget_id]
    end

    create_join_table :budgets, :categories do |t|
      t.index [:budget_id, :category_id]
      t.index [:category_id, :budget_id]
    end
  end
end