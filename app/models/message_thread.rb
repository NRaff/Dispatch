# == Schema Information
#
# Table name: message_threads
#
#  id         :bigint           not null, primary key
#  is_thread  :boolean          default(FALSE), not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_message_threads_on_name  (name) UNIQUE
#
class MessageThread < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :is_thread, inclusion: {in: [true, false] }

  has_many :user_threads,
    foreign_key: :thread_id,
    class_name: :UserThread

  has_many :members,
    through: :user_threads,
    source: :user
end
