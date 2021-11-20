import React from 'react'
import ReactDOM from 'react-dom'
import * as UserApi from './utils/user_api'
import * as SessionApi from './utils/session_api'
import configureStore from './store/store'
import { requestLoginUser, requestLogoutUser } from './actions/session_actions'

const getPreloadedState = () => {
  let preloadedState = {}
  if (window.currentUser) {
    preloadedState = {
      session: {
        userId: window.currentUser.id
      }
    }
    delete window.currentUser
  }
  return preloadedState;
}

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root')
  let preloadedState = getPreloadedState()
  const store = configureStore(preloadedState);
  ReactDOM.render(
    <h1>React is working!</h1>,
    root
  )
  window.store = store;
  window.login = requestLoginUser //WAE
  window.logout = requestLogoutUser //WAE
})

