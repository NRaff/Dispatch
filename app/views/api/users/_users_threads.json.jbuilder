json.threads do
  threads.map do |item|
    userIds = {:userIds => item.members.map{ |mt| mt.id }}
    json.set! item.id do
      json.partial! 'api/message_threads/msg_thread', msg_thread: item
      json.merge! userIds
    end
  end
end

