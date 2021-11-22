threads = @user.threads
json.user do
  json.partial! 'api/users/user', user: @user
end
json.partial! 'api/users/users_threads', threads: threads