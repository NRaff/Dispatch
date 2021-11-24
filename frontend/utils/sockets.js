export const createRealtimeThread = dispatch => {
  App.cable.subscriptions.create(
    { channel: "ThreadChatChannel" },
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
      deleteMessage: function (data) {
        return this.perform("delete_message", data)
      }
    }
  );
}

export const newMessage = payload => {
  App.cable.subscriptions.subscriptions[0].receiveMessage(payload)
}

export const deleteMessage = payload => {
  App.cable.subscriptions.subscriptions[0].deleteMessage(payload)
}