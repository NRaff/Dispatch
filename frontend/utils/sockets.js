export const createRealtimeThread = (dispatch, threadId) => {
  App.cable.subscriptions.create(
    { 
      channel: 'ThreadChatChannel',
      thread: threadId
    },
    {
      received: data => {
        dispatch(data)
      },
      receiveMessage: function (data) {
        return this.perform("receive_message", data)
      },
      receiveThreadMessages: function (data) {
        return this.perform("receive_thread_messages", data)
      },
      updateMessage: function (data) {
        return this.perform("update_message", data)
      },
      deleteMessage: function (data) {
        return this.perform("delete_message", data)
      }
    }
  );
}

export const getThreadMessages = threadId => {
  App.cable.subscriptions.subscriptions[0].receiveThreadMessages(threadId)
}

export const newMessage = payload => {
  App.cable.subscriptions.subscriptions[0].receiveMessage(payload)
}

export const updateMessage = payload => {
  App.cable.subscriptions.subscriptions[0].updateMessage(payload)
}

export const deleteMessage = payload => {
  App.cable.subscriptions.subscriptions[0].deleteMessage(payload)
}