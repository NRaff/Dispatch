import React from "react";
import { Link } from "react-router-dom";
import { demoLogin } from "../../utils/demo_login";

class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.demoLogin = this.demoLogin.bind(this)
  }

  componentWillUnmount(){
    this.props.removeErrors();
  }

  handleInput(e) {
    e.preventDefault()
    let user = Object.assign({}, this.state.user)
    user[e.target.id] = e.target.value
    this.setState({user})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {action} = this.props
    action(this.state.user)
  }

  demoLogin(){
    let user = demoLogin(this)
    this.props.loginDemo(user)
  }

  otherAction(){
    const {authType} = this.props
    const action = authType === 'Login' ? 'signup' : 'login'
    const display = authType === 'Login' ? 'Sign Up' : 'Login'
    return {
      authAction: action,
      display: display
    }
  }

  displayErrors(errType){
    const { errors } = this.props
    if (errors[errType]) {
      const displayText = {
        email: 'Email',
        displayName: 'Display name',
        password: 'Password',
        login: 'Oops!'
      }
      return (
        <ul className='errorSection'>
          {errors[errType].map((msg, idx) => (
            <li key={idx} className='errorItem'>{`${displayText[errType]} ${msg}`}</li>
          ))}
        </ul>
      )
    }
  }

  includeDetails(){
    if (this.props.authType === 'Sign Up'){
      const {displayName} = this.state.user
      return (
        <>
          <label htmlFor="displayName">Display Name</label>
          {this.displayErrors('displayName')}
          <input
              id="displayName"
              type="text"
              onChange={this.handleInput}
              value={displayName}
            />
        </>
      )
    }
  }

  render() {
    const {authType} = this.props
    const {email, password} = this.state.user
    return (
      <div className='authForm'>
        <h1>{authType}</h1>
        {this.displayErrors('login')}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          {this.displayErrors('email')}
          <input
            id="email"
            type="text"
            onChange={this.handleInput}
            value={email}
          />
          {this.includeDetails()}
          <label htmlFor="password">Password</label>
          {this.displayErrors('password')}
          <input
            id="password"
            type="password"
            onChange={this.handleInput}
            value={password}
          />
          <input
            type="submit"
            value={authType}
          />
        </form>
        <div className='authOption'>
          <hr />
          <h3>OR</h3>
          <hr />
        </div>
        <Link className='ui-button' to={`/${this.otherAction().authAction}`}>{this.otherAction().display}</Link>
        <button 
          className='ui-button'
          onClick={this.demoLogin}
        >Login as Demo</button>
      </div>
      
    )
  }
}

export default AuthForm;