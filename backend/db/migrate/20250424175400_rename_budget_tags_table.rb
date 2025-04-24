class RenameBudgetTagsTable < ActiveRecord::Migration[8.0]
  def change
    rename_table :budgets_tags, :tags_travels
    rename_column :tags_travels, :budget_id, :travel_id
  end
end
