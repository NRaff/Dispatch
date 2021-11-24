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
    message = Message.find(params[:id])
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

  def receive_thread_messages(thread_id)
    byebug
    thread = MessageThread
              .includes(:messages)
              .where(id: thread_id)
    messages = {}
    if thread
      messages = set_messages_JSON(thread.messages)
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
