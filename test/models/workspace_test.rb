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
require 'test_helper'

class WorkspaceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
