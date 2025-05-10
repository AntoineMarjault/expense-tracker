class AddDefaultCurrencyToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :default_currency, :string, null: false, default: 'EUR'
  end
end
