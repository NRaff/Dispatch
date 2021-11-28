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
      receiveAllUsers: function () {
        return this.perform("receive_all_users")
      }
    }
  )
}

export const receiveAllUsers = () => {
  let userConfigSub = App.cable.subscriptions.subscriptions[0]
  userConfigSub.receiveAllUsers()
}