require 'byebug'

class ThreadChatChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_for 'thread_chat'
  end

  def receive_message(new_message)
    message = Message.new(message_params(new_message))
    if message.save
      socket = {message: set_message_JSON(message), type: 'RECEIVE_MESSAGE'}
    else
      err = message.errors.messages
      socket = {
        errors: err,
        status: 422,
        currentUser: message.sender_id,
        type: 'RECEIVE_MESSAGE_ERRORS'
      }
    end
    ThreadChatChannel.broadcast_to('thread_chat', socket)
  end

  def update_message(payload)
    message = Message.find(payload['message']['id'])
    if message.update(message_params(payload))
      socket = {
        message: set_message_JSON(message), 
        type: 'RECEIVE_MESSAGE'
      }
    else
      err = message.errors.messages
      socket = {
        errors: err,
        status: 422,
        currentUser: payload['currentUserId'],
        type: 'RECEIVE_MESSAGE_ERRORS'
      }
    end
    ThreadChatChannel.broadcast_to('thread_chat', socket)
  end

  def delete_message(payload)
    message = Message.find(payload['id'])
    if message.destroy
      socket = {messageId: payload['id'], type: 'REMOVE_MESSAGE'}
    else
      err = ["There was an issue deleting the message. Please try again."]
      socket = {
        errors: err,
        status: 422,
        currentUser: payload['sender_id'],
        type: 'RECEIVE_MESSAGE_ERRORS'
      }
    end
    ThreadChatChannel.broadcast_to('thread_chat', socket)
  end

  def receive_thread_messages(payload)
    msg_thread = MessageThread
              .includes(:messages)
              .find(payload['threadId'])
    messages = {}
    if msg_thread
      messages = set_messages_JSON(msg_thread.messages)
    end
    socket = {messages: messages, type: 'RECEIVE_ALL_MESSAGES'}
    ThreadChatChannel.broadcast_to('thread_chat', socket)
  end

  def message_params(message)
    params = {
      message: message['message']['message'],
      thread_id: message['message']['threadId'],
      sender_id: message['message']['senderId']
    }
    params
  end

  def set_message_JSON(snake_message)
    snakeHash = snake_message.attributes
    msgJSON = Hash.new()
    snakeHash.each { |key, val| msgJSON[key.camelize(:lower)] = val}
    msgJSON
  end

  def set_messages_JSON(messages)
    allMessages = Hash.new()
    messages.each do |msg|
      subMsg = Hash.new()
      msg.attributes.each { |key, val| subMsg[key.camelize(:lower)] = val }
      allMessages[msg.id] = subMsg
    end
    allMessages
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
