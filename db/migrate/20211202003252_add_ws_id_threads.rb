class AddWsIdThreads < ActiveRecord::Migration[5.2]
  def change
    add_column :message_threads, :workspace_id, :integer
  end
end
