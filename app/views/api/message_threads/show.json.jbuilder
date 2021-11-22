json.set @message_thread.id do
  json.partial! 'api/message_threads/msg_thread', thread: @message_thread
end