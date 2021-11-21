import React from "react"
import { Colors } from "../../utils/theme"

class TopNav extends React.Component {
  componentDidMount(){
    // use top nav load to swap the background color
    document.body.style.background = Colors.dark
    const {fetchUser, currentUserId} = this.props
    fetchUser(currentUserId)
  }

  componentWillUnmount(){
    document.body.style.background = Colors.superLight
  }

  includeDisplayName(user){
    if (user) {
      return (<h3>Hello, {user.displayName}!</h3>)
    }
  }

  render(){
    const {user, logout} = this.props
    return (
      <nav>
        {this.includeDisplayName(user)}
        <button onClick={() => logout()}>Logout</button>
      </nav>
    )
  }
}

export default TopNav;