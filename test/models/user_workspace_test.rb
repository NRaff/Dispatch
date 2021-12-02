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
require 'test_helper'

class UserWorkspaceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
