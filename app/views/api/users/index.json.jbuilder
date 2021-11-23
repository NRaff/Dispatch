@users.map do |user|
  json.set! user.id do
    json.partial! 'api/users/other_users', user: user
  end
end