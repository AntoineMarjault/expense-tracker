class AddNotNullToTransactionCountryCode < ActiveRecord::Migration[8.0]
  def change
    change_column_null :transactions, :country_code, false
  end
end
