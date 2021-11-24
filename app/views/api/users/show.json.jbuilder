threads = @user.threads
messages = @user.accessible_messages
# byebug
json.user do
  json.partial! 'api/users/user', user: @user
end
json.partial! 'api/users/users_threads', threads: threads
json.partial! 'api/users/users_messages', messages: messages