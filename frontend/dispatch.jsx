import React from 'react'
import ReactDOM from 'react-dom'
import * as UserApi from './utils/user_api'
import * as SessionApi from './utils/session_api'

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root')
  ReactDOM.render(
    <h1>React is working!</h1>,
    root
  )
  window.fetchUser = UserApi.fetchUser // WAE
  window.fetchUsers = UserApi.fetchUsers // WAE
  window.createUser = UserApi.createUser // WAE
  window.deleteUser = UserApi.deleteUser // WAE - need to test after logging in
  window.updateUser = UserApi.updateUser // WAE
  window.newSession = SessionApi.newSession // WAE
  window.deleteSession = SessionApi.deleteSession //WAE
})