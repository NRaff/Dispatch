# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Workspace.delete_all
workspaces = Workspace.create([
  {name: 'Tattooine'},
  {name: 'Hoth'},
  {name: 'Coruscant'}
])

User.delete_all
UserWorkspace.delete_all
Workspace.first.users.create([
  {password: 123456, display_name: 'nick', email: 'nick@email.com'},
  {password: 123456, display_name: 'One', email: 'one@email.com'},
  {password: 123456, display_name: 'Two', email: 'two@email.com'},
  {password: 123456, display_name: 'Three', email: 'three@email.com'},
  {password: 123456, display_name: 'Demo', email: 'Demo@email.com'},
  {password: 123456, display_name: 'Free Guy', email: 'free@email.com'}
])

tattooine = Workspace.find_by(name: 'Tattooine')
hoth = Workspace.find_by(name: 'Hoth')
coruscant = Workspace.find_by(name: 'Coruscant')

users = User.all
ws_assignments = []
users.each do |user|
  ws_assignments.push({user_id: user.id, workspace_id: hoth.id})
  ws_assignments.push({user_id: user.id, workspace_id: coruscant.id})
end

UserWorkspace.create(ws_assignments)

MessageThread.delete_all
threads = MessageThread.create([
  {name: 'Thread 1'},
  {name: 'Thread 2'},
  {name: 'Thread 3'},
  {name: 'Thread 4'},
])

Message.delete_all
messages = Message.create([
  {thread_id: 24, message: 'Hello world'},
  {thread_id: 24, message: 'Hello world 2'},
  {thread_id: 24, message: 'Hello world 3'},
  {thread_id: 24, message: 'Hello world 4'}
])