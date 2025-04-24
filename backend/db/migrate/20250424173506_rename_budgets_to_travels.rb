class RenameBudgetsToTravels < ActiveRecord::Migration[8.0]
  def change
    rename_table :budgets, :travels
  end
end
