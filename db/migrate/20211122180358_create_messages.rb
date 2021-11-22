class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :message, null: false
      t.integer :sender_id, null: false
      t.integer :thread_id, null: false
      t.timestamps
    end

    add_index :messages, :sender_id
    add_index :messages, :thread_id
  end
end
