class CreateMessageThreads < ActiveRecord::Migration[5.2]
  def change
    create_table :message_threads do |t|
      t.string :name, null: false
      t.boolean :is_thread, null: false, default: false
      t.timestamps
    end

    add_index :message_threads, :name, unique: true
  end
end
