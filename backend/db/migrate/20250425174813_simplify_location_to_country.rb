class SimplifyLocationToCountry < ActiveRecord::Migration[8.0]
  def up
    add_column :transactions, :country_code, :string, limit: 2 unless column_exists?(:transactions, :country_code)

    execute "UPDATE transactions SET location_id = NULL"

    remove_foreign_key :transactions, :locations if foreign_key_exists?(:transactions, :locations)
    remove_reference :transactions, :location if column_exists?(:transactions, :location_id)

    drop_table :locations if table_exists?(:locations)
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "Can't restore locations data"
  end
end