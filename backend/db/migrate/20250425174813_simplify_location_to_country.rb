class SimplifyLocationToCountry < ActiveRecord::Migration[8.0]
  def up
    remove_foreign_key :transactions, :locations if foreign_key_exists?(:transactions, :locations)

    remove_reference :transactions, :location if column_exists?(:transactions, :location_id)

    add_column :transactions, :country_code, :string, limit: 2 unless column_exists?(:transactions, :country_code)

    drop_table :locations if table_exists?(:locations)
  end

  def down
    create_table :locations do |t|
      t.string :country_code, limit: 2, null: false
      t.timestamps
    end

    remove_column :transactions, :country_code if column_exists?(:transactions, :country_code)

    add_reference :transactions, :location, foreign_key: true
  end
end