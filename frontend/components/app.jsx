import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"

const App = (props) => (
  <HashRouter>
    <div>
      <h1>React Root is working</h1>
      <Route path='/' render={() => (<h1>Hello World</h1>)}></Route>
      <AuthRoute path='/login' component={LoginContainer}/>
      <AuthRoute path='/signup' component={SignupContainer}/>
    </div>
  </HashRouter>
)

export default App;