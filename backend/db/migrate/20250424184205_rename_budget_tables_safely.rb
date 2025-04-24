class RenameBudgetTablesSafely < ActiveRecord::Migration[8.0]
    def change
      reversible do |dir|
        dir.up do
          execute "ALTER TABLE IF EXISTS budgets RENAME TO travels"
          execute "ALTER TABLE IF EXISTS budgets_categories RENAME TO categories_travels"
          execute "ALTER TABLE IF EXISTS categories_travels RENAME COLUMN budget_id TO travel_id"
          execute "ALTER TABLE IF EXISTS budgets_tags RENAME TO tags_travels"
          execute "ALTER TABLE IF EXISTS tags_travels RENAME COLUMN budget_id TO travel_id"
        end

        dir.down do
          execute "ALTER TABLE IF EXISTS travels RENAME TO budgets"
          execute "ALTER TABLE IF EXISTS categories_travels RENAME TO budgets_categories"
          execute "ALTER TABLE IF EXISTS tags_travels RENAME TO budgets_tags"
        end
      end
    end
end
