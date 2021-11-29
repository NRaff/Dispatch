export const createRealtimeUser = (dispatch, userId) => {
  App.cable.subscriptions.create(
    {
      channel: 'UserConfigChannel',
      user: userId
    },
    {
      received: data => {
        dispatch(data)
      },
      receiveAllUsers: function (data) {
        return this.perform("receive_all_users", data)
      },
      receiveUser: function (data) {
        return this.perform("receive_user", data)
      },
      receiveThread: function (data) {
        return this.perform("receive_thread", data)
      },
      deleteThread: function (data) {
        return this.perform("delete_thread", data)
      }
    }
  )
}

const identifyUserSub = (subscriptions, user) => {
  for (const sub of subscriptions) {
    let subObj = JSON.parse(sub.identifier)
    if (subObj.user === user) {
      return sub
    }
  }
}

export const receiveAllUsers = user => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, user)
  userConfigSub.receiveAllUsers({user})
}

export const receiveUser = user => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, user)
  userConfigSub.receiveUser({user})
}

export const receiveThread = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.receiveThread(payload)
}

export const deleteThread = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.deleteThread(payload)
}