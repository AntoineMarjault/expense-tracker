class CreateTagsAndTransactionTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.belongs_to :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end