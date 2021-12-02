class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.string :name, null: false
      t.string :keycode, null: false
      t.timestamps
    end

    add_index :workspaces, :name
    add_index :workspaces, :keycode, unique: true
  end
end
