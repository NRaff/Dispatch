import React from "react";
import { Link } from "react-router-dom";

class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.user

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput(e) {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {action} = this.props
    action(this.state)
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

  includeDetails(){
    if (this.props.authType === 'Sign Up'){
      const {displayName, username} = this.state
      return (
        <>
          <label htmlFor="displayName">Display Name</label>
          <input
              id="displayName"
              type="text"
              onChange={this.handleInput}
              value={displayName}
            />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={this.handleInput}
            value={username}
          />
        </>
      )
    }
  }

  render() {
    const {authType} = this.props
    const {email, password} = this.state

    return (
      <div>
        <h1>{authType}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            onChange={this.handleInput}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={this.handleInput}
            value={password}
          />
          {this.includeDetails()}
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
        <Link to={`/${this.otherAction().authAction}`}>{this.otherAction().display}</Link>
      </div>
      
    )
  }
}

export default AuthForm;