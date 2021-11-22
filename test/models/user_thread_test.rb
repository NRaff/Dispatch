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
require 'test_helper'

class UserThreadTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
