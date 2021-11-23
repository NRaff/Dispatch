json.messages do
  messages.map do |msg|
    json.set! msg.id do
      json.partial! 'api/messages/message', message: msg
    end
  end
end