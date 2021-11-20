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
    const {authType, action} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{authType}</h1>
        <input 
          id='email'
          type="text"
        />
      </form>
    )
  }
}