import React from "react"
import { Colors, Icons } from "../../utils/theme"
import Logo from "../logo"
import Profile from "./profile"

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

  // includeDisplayName(user){
  //   if (user) {
  //     return (<h3>Hello, {user.displayName}!</h3>)
  //   }
  // }

  render(){
    const {user, logout} = this.props
    return (
      <nav className='top-nav'>
        <Logo theme={Icons.logo.lightLogo} />
        <Profile theme={Icons.profile.lightProfile} user={user} logout={logout}/>
        {/* <button onClick={() => logout()}>Logout</button> */}
      </nav>
    )
  }
}

export default TopNav;