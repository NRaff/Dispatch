# == Schema Information
#
# Table name: user_workspaces
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#  workspace_id :integer          not null
#
# Indexes
#
#  index_user_workspaces_on_user_id                   (user_id)
#  index_user_workspaces_on_user_id_and_workspace_id  (user_id,workspace_id) UNIQUE
#  index_user_workspaces_on_workspace_id              (workspace_id)
#
class UserWorkspace < ApplicationRecord
  validates :user_id, :workspace_id, presence: true

  belongs_to :workspace,
  foreign_key: :workspace_id,
  class_name: :Workspace

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User
end
