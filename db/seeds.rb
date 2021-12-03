# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'byebug'

User.delete_all
UserWorkspace.delete_all
# byebug
users = User.create([
  {password: 123456, display_name: 'Obi Wan', email: '01@email.com'},
  {password: 123456, display_name: 'Quigon', email: 'q@email.com'},
  {password: 123456, display_name: 'Mace Windu', email: 'mace@email.com'},
  {password: 123456, display_name: 'Anakin Skywalker', email: 'skyguy@email.com'},
  {password: 123456, display_name: 'Yoda', email: 'yoda@email.com'},
  {password: 123456, display_name: 'Ashoka Tano', email: 'at@email.com'},
  {password: 123456, display_name: 'Demo User', email: 'Demo@email.com'}

])

obi_wan = users.select { |u| u.display_name == 'Obi Wan'}[0]
quigon = users.select { |u| u.display_name == 'Quigon'}[0]
anakin = users.select { |u| u.display_name == 'Anakin Skywalker'}[0]
yoda = users.select { |u| u.display_name == 'Yoda'}[0]
ashoka = users.select { |u| u.display_name == 'Ashoka Tano'}[0]
mace = users.select { |u| u.display_name == 'Mace Windu'}[0]

Workspace.delete_all
workspaces = Workspace.create([
  {name: 'Tattooine', created_by: anakin.id },
  {name: 'Hoth', created_by: ashoka.id},
  {name: 'Coruscant', created_by: obi_wan.id}
])

tattooine = Workspace.find_by(name: 'Tattooine')
hoth = Workspace.find_by(name: 'Hoth')
coruscant = Workspace.find_by(name: 'Coruscant')

users = User.all
ws_assignments = []
users.each do |user|
  ws_assignments.push({user_id: user.id, workspace_id: hoth.id})
  ws_assignments.push({user_id: user.id, workspace_id: coruscant.id})
  ws_assignments.push({user_id: user.id, workspace_id: tattooine.id})

end

UserWorkspace.create(ws_assignments)

# these need workspace ids
# some should be DMs
MessageThread.delete_all
threads = MessageThread.create([
  {name: 'Cantina', workspace_id: tattooine.id, is_thread: true},
  {name: 'Rebel Base', workspace_id: hoth.id, is_thread: true},
  {name: 'Jedi Temple', workspace_id: coruscant.id, is_thread: true},
  {name: 'The Senate', workspace_id: coruscant.id, is_thread: true},
])

thread_assignments = []
users.each do |user|
  threads.each do |t|
    thread_assignments.push({user_id: user.id, thread_id: t.id})
  end
end
UserThread.create(thread_assignments)


cantina = MessageThread.find_by(name: 'Cantina')
rebel_base = MessageThread.find_by(name: 'Rebel Base')
jedi_temple = MessageThread.find_by(name: 'Jedi Temple')
senate = MessageThread.find_by(name: 'The Senate')

Message.delete_all
messages = Message.create([
  {thread_id: cantina.id, message: 'Have you ever been to the races?', sender_id: anakin.id},
  {thread_id: cantina.id, message: 'What races?', sender_id: quigon.id},
  {thread_id: cantina.id, message: "Pod racing! It's the fastest sport in the galaxy!", sender_id: anakin.id},
  {thread_id: cantina.id, message: "We should definitely bet everything on it.", sender_id: quigon.id},
  {thread_id: rebel_base.id, message: "We weren't actually on hoth in the movie were we?", sender_id: mace.id},
  {thread_id: rebel_base.id, message: "In the movie at all, we were not.", sender_id: yoda.id}
])