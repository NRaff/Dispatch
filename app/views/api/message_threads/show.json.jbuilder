require 'byebug'
userIds = {:userIds => @message_thread.members.map{ |mt| mt.id }}

json.set! @message_thread.id do
  json.partial! 'api/message_threads/msg_thread', msg_thread: @message_thread
  json.merge! userIds
end