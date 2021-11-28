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

const identifySubs = (subscriptions, thread) => {
  for (const sub of subscriptions) {
    let subObj = JSON.parse(sub.identifier)
    if (subObj.thread === thread) return sub
  }
}

export const getThreadMessages = threadId => {
  //need to identify the correct thread to call the action on
  App.cable.subscriptions.subscriptions[0].receiveThreadMessages(threadId)
}

export const newMessage = payload => {
  let threadSub = identifySubs(App.cable.subscriptions.subscriptions, payload.message.threadId)
  threadSub.receiveMessage(payload)
}

export const updateMessage = payload => {
  //need to identify the correct thread to call the action on
  App.cable.subscriptions.subscriptions[0].updateMessage(payload)
}

export const deleteMessage = payload => {
  //need to identify the correct thread to call the action on
  App.cable.subscriptions.subscriptions[0].deleteMessage(payload)
}