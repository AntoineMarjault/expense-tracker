class AddLocationToTransacions < ActiveRecord::Migration[8.0]
  def change
    add_reference :transactions, :location, foreign_key: true, null: true
  end
end
