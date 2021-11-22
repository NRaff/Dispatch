class CreateUserThreads < ActiveRecord::Migration[5.2]
  def change
    create_table :user_threads do |t|
      t.integer :user_id, null: false
      t.integer :thread_id, null: false
      t.timestamps
    end
    add_index :user_threads, :user_id
    add_index :user_threads, :thread_id
    add_index :user_threads, [:user_id, :thread_id], unique: true
  end
end
