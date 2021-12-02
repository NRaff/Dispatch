# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint           not null, primary key
#  keycode    :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_workspaces_on_keycode  (keycode) UNIQUE
#  index_workspaces_on_name     (name)
#
class Workspace < ApplicationRecord
  after_initialize :set_keycode

  validates :name, :keycode, presence: true
  validates :keycode, uniqueness: true

  has_many :threads,
  foreign_key: :workspace_id,
  class_name: :MessageThread,
  dependent: :destroy

  has_many :workspace_users,
  foreign_key: :workspace_id,
  class_name: :UserWorkspace

  has_many :users,
  through: :workspace_users,
  source: :user

  private
  def set_keycode
    self.keycode ||= SecureRandom::base64(5)
  end
end
