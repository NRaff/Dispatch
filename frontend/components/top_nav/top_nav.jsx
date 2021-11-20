import React from "react"

class TopNav extends React.Component {
  componentDidMount(){
    const {fetchUser, currentUserId} = this.props
    fetchUser(currentUserId)
  }

  includeDisplayName(user){
    if (user) {
      return (<h3>Hello, {user.displayName}!</h3>)
    }
  }

  render(){
    const {user, logout} = this.props
    debugger
    return (
      <nav>
        {this.includeDisplayName(user)}
        <button onClick={() => logout()}>Logout</button>
      </nav>
    )
  }
}

export default TopNav;