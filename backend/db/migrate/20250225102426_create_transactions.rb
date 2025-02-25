class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.string :name
      t.string :currency, null: false, default: 'EUR'
      t.string :category
      t.timestamp :date

      t.timestamps
    end
  end
end
