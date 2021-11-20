import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"
import TopNavContainer from './top_nav/top_nav_container'

const App = (props) => (
  <HashRouter>
    <div>
      <Route path='/' render={() => (<h1>Hello World</h1>)} />
      <ProtectedRoute path='/' component={TopNavContainer} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute path='/signup' component={SignupContainer} />
      
    </div>
  </HashRouter>
)

export default App;