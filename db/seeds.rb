# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create([
  {username: 'nraff', password: 123456, display_name: 'nick', email: 'nick@email.com'},
  {username: 'testOne', password: 123456, display_name: 'One', email: 'one@email.com'},
  {username: 'testTwo', password: 123456, display_name: 'Two', email: 'two@email.com'},
  {username: 'testThree', password: 123456, display_name: 'Three', email: 'three@email.com'}
])