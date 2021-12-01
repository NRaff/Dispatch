import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"
import TopNavContainer from './top_nav/top_nav_container'
import Welcome from "./welcome"
import NotificationContainer from "./notification/notification_container"
import MainApp from "./main"

const App = (props) => (
  <HashRouter>
      <AuthRoute path='/' component={Welcome} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute path='/signup' component={SignupContainer} />
      <div className='app-page'>
        <ProtectedRoute path='/' component={NotificationContainer} />
        <ProtectedRoute path='/' component={TopNavContainer} />
        <ProtectedRoute path='/' component={MainApp} />
      </div>
  </HashRouter>
)

export default App;