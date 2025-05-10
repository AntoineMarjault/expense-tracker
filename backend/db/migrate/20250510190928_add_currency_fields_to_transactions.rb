class AddCurrencyFieldsToTransactions < ActiveRecord::Migration[8.0]
  def up
    add_column :transactions, :amount_in_default_currency, :decimal, precision: 10, scale: 2

    # Set amount_in_default_currency equal to amount for existing records
    Transaction.update_all('amount_in_default_currency = amount')

    # Now make the column not null after setting default values
    change_column_null :transactions, :amount_in_default_currency, false
  end

  def down
    remove_column :transactions, :amount_in_default_currency
  end
end
