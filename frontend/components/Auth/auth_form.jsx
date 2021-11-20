import React from "react";

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

  render() {
    const {authType} = this.props
    const {email, password} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{authType}</h1>
        <label htmlFor="email">Email Address</label>
        <input 
          id="email"
          type="text"
          onChange={this.handleInput}
          value={email}
        />
        <label htmlFor="email">Password</label>
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
    )
  }
}

export default AuthForm;