# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_02_221844) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "message_threads", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "is_thread", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "workspace_id"
    t.index ["name"], name: "index_message_threads_on_name"
  end

  create_table "messages", force: :cascade do |t|
    t.text "message", null: false
    t.integer "sender_id", null: false
    t.integer "thread_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sender_id"], name: "index_messages_on_sender_id"
    t.index ["thread_id"], name: "index_messages_on_thread_id"
  end

  create_table "user_threads", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "thread_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thread_id"], name: "index_user_threads_on_thread_id"
    t.index ["user_id", "thread_id"], name: "index_user_threads_on_user_id_and_thread_id", unique: true
    t.index ["user_id"], name: "index_user_threads_on_user_id"
  end

  create_table "user_workspaces", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "workspace_id"], name: "index_user_workspaces_on_user_id_and_workspace_id", unique: true
    t.index ["user_id"], name: "index_user_workspaces_on_user_id"
    t.index ["workspace_id"], name: "index_user_workspaces_on_workspace_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "display_name", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.string "keycode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "created_by", null: false
    t.index ["keycode"], name: "index_workspaces_on_keycode", unique: true
    t.index ["name"], name: "index_workspaces_on_name"
  end

end
