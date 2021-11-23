import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"
import TopNavContainer from './top_nav/top_nav_container'
import Welcome from "./welcome"
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'

const App = (props) => (
  <HashRouter>
    <>
      {/* <Route path='/' render={() => (<h1>Hello World</h1>)} /> */}
      <AuthRoute path='/' component={Welcome} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute path='/signup' component={SignupContainer} />
      <div className='app-page'>
        <ProtectedRoute path='/' component={TopNavContainer} />
        <div className='main-app'>
          <ProtectedRoute path='/' component={ThreadsContainer} />
          <div className='messages-area'>
            <ProtectedRoute path='/' component={MessagesContainer} />
            <ProtectedRoute path='/' component={NewMessageContainer} />
            <ProtectedRoute exact path='/:messageId' component={EditMessageContainer} />
          </div>
        </div>
      </div>
      

      
    </>
  </HashRouter>
)

export default App;