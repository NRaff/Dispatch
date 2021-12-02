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
      },
      setupWorkspace: function (data) {
        return this.perform("setup_workspace", data)
      },
      joinWorkspace: function (data) {
        return this.perform("join_workspace", data)
      },
      createWorkspace: function (data) {
        return this.perform("create_workspace", data)
      },
      leaveWorkspace: function (data) {
        return this.perform("leave_workspace", data)
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

export const receiveAllUsers = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, user)
  userConfigSub.receiveAllUsers(payload)
}

export const receiveUser = user => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, user)
  userConfigSub.receiveUser({user})
}

export const receiveThread = payload => {
  // debugger
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.receiveThread(payload)
}

export const deleteThread = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.deleteThread(payload)
}

export const setupWorkspace = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.setupWorkspace(payload)
}

export const joinWorkspace = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.joinWorkspace(payload)
}

export const leaveWorkspace = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.leaveWorkspace(payload)
}

export const createWorkspace = payload => {
  let userConfigSub = identifyUserSub(App.cable.subscriptions.subscriptions, payload.user)
  userConfigSub.createWorkspace(payload)
}