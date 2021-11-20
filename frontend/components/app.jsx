import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoginContainer from './Auth/login_container'
import SignupContainer from './Auth/signup_container'

const App = (props) => (
  <HashRouter>
    <div>
      <h1>React Root is working</h1>
      <Route path='/' render={() => (<h1>Hello World</h1>)}></Route>
      <Route exact path='/login' component={LoginContainer}></Route>
      <Route exact path='/signup' component={SignupContainer}></Route>
    </div>
  </HashRouter>
)

export default App;