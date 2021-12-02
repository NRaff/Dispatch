class AddCreatedByWorkspace < ActiveRecord::Migration[5.2]
  def change
    add_column :workspaces, :created_by, :integer, null: false
  end
end
