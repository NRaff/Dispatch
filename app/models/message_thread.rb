# == Schema Information
#
# Table name: message_threads
#
#  id           :bigint           not null, primary key
#  is_thread    :boolean          default(FALSE), not null
#  name         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :integer
#
# Indexes
#
#  index_message_threads_on_name  (name)
#
class MessageThread < ApplicationRecord
  validates :name, presence: true
  validates :is_thread, inclusion: {in: [true, false] }

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  has_many :user_threads,
    foreign_key: :thread_id,
    class_name: :UserThread,
    dependent: :destroy

  has_many :members,
    through: :user_threads,
    source: :user

  has_many :messages,
    foreign_key: :thread_id,
    class_name: :Message,
    dependent: :destroy

  # check if a thread name exists in the list of threads a user has access to
end
