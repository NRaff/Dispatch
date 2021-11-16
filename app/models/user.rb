# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  display_name    :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
class User < ApplicationRecord
  validates :display_name, :email, :password_digest, :session_token, :username, presence: true
  validates :email, :session_token, :username, uniqueness: true

  # ASPIRE
  def self.find_by_credentials(username, password)

  end

  def password=(password)

  end

  def is_password?(password)

  end

  def ensure_session_token

  end

  def reset_session_token!

  end

  def self.generate_session_token

  end
end
