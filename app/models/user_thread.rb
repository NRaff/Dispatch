# == Schema Information
#
# Table name: user_threads
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  thread_id  :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_user_threads_on_thread_id              (thread_id)
#  index_user_threads_on_user_id                (user_id)
#  index_user_threads_on_user_id_and_thread_id  (user_id,thread_id) UNIQUE
#
class UserThread < ApplicationRecord
  validates :thread_id, :user_id, presence: true
  validates :thread_id, uniqueness: {scope: [:user_id]}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :message_thread,
    foreign_key: :thread_id,
    class_name: :MessageThread
end
