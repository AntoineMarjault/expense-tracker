class RenameBudgetCategoriesTable < ActiveRecord::Migration[8.0]
  def change
    rename_table :budgets_categories, :categories_travels
    rename_column :categories_travels, :budget_id, :travel_id
  end
end
