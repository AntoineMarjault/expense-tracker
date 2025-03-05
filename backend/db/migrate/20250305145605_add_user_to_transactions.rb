class AddUserToTransactions < ActiveRecord::Migration[8.0]
  def change
        add_reference :transactions, :user, null: true, foreign_key: true

        reversible do |dir|
          dir.up do
            default_user = User.first
            if default_user
              Transaction.update_all(user_id: default_user.id)
            end
          end
        end

        # Then make it non-nullable
        change_column_null :transactions, :user_id, false
  end
end
