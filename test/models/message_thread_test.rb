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
#  index_message_threads_on_name  (name)
#
require 'test_helper'

class MessageThreadTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
