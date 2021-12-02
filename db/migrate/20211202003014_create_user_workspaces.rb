class CreateUserWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :user_workspaces do |t|
      t.integer :user_id, null: false
      t.integer :workspace_id, null: false
      t.timestamps
    end
    add_index :user_workspaces, :user_id
    add_index :user_workspaces, :workspace_id
    add_index :user_workspaces, [:user_id, :workspace_id], unique: true
  end
end
