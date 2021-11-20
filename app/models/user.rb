# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  display_name    :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
  attr_reader :password

  validates :display_name, :email, :password, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true

  after_initialize :ensure_session_token

  # ASPIRE
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_correct_password?(password)
    return nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_correct_password?(password)
    passObj = BCrypt::Password.new(self.password_digest)
    passObj.is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def self.generate_session_token
    SecureRandom::base64(12)
  end
end
