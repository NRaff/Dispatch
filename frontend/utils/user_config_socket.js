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
        debugger
        return this.perform("receive_all_users", data)
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

export const receiveAllUsers = (user) => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, user)
  userConfigSub.receiveAllUsers({user})
}