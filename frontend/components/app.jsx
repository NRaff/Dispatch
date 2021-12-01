import React from "react"
import { HashRouter, Route } from "react-router-dom"
import { Switch } from "react-router"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"
import TopNavContainer from './top_nav/top_nav_container'
import Welcome from "./welcome"
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'
import ThreadInviteContainer from './threads/thread_invite_container'
import NotificationContainer from "./notification/notification_container"

const App = (props) => (
  <HashRouter>
      <AuthRoute path='/' component={Welcome} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute path='/signup' component={SignupContainer} />
      <div className='app-page'>
        <ProtectedRoute path='/' component={NotificationContainer} />
        <ProtectedRoute path='/' component={TopNavContainer} />
        <div className='main-app'>
          <ProtectedRoute path='/' component={ThreadsContainer} />
          <ProtectedRoute exact path='/new/:thread' component={ThreadInviteContainer} />
          <div className='messages-area'>
            <ProtectedRoute path='/' component={MessagesContainer} />
            <ProtectedRoute path='/' component={NewMessageContainer} />
            <ProtectedRoute exact path='/edit/:messageId' component={EditMessageContainer} />
          </div>
        </div>
      </div>
  </HashRouter>
)

export default App;