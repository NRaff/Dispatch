require 'byebug'

class ThreadChatChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_for 'thread_chat'
  end

  def speak(data)
    snaked_msg = {
      message: data['message']['message'],
      thread_id: data['message']['threadId'],
      sender_id: data['message']['senderId']
    }
    message = Message.new(snaked_msg)
    # message.user_id = current_user.id
    if message.save
      socket = { message: message }
    else
      err = message.errors.messages
      socket = {
        errors: err,
        status: 422
      }
      byebug
    end
    ThreadChatChannel.broadcast_to('thread_chat', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
