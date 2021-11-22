import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import { createThread, deleteThread, updateThread } from './actions/thread_actions'

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
  ReactDOM.render(<Root store={store} />, root)
  window.store = store;
  window.createThread = createThread
  window.updateThread = updateThread
  window.deleteThread = deleteThread
  
})

