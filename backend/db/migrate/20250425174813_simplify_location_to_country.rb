class SimplifyLocationToCountry < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :transactions, :locations
    remove_reference :transactions, :location

    add_column :transactions, :country_code, :string, limit: 2

    drop_table :locations
  end
end