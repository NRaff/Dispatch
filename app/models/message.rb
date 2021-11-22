# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  message    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sender_id  :integer          not null
#  thread_id  :integer          not null
#
# Indexes
#
#  index_messages_on_sender_id  (sender_id)
#  index_messages_on_thread_id  (thread_id)
#
class Message < ApplicationRecord
  validates :message, :sender_id, :thread_id, presence: true

  belongs_to :thread,
    foreign_key: :thread_id,
    class_name: :MessageThread
end
