class AlterThreadsIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :message_threads, name: "index_message_threads_on_name"
    add_index :message_threads, :name
  end
end
