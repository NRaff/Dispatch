import React from "react"
import { Colors, Icons } from "../../utils/theme"
import Logo from "../logo"
import Profile from "./profile"
import * as RealtimeUser from "../../utils/user_config_socket"
import SearchContainer from "../top_nav/search_container"
import { HiddenWorkspace } from "../../utils/route_utils"

class TopNav extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // use top nav load to swap the background color
    document.body.style.background = Colors.dark
    const {currentUserId} = this.props
    RealtimeUser.createRealtimeUser(this.props.dispatch, currentUserId)
  }

  componentWillUnmount(){
    document.body.style.background = Colors.superLight
  }

  render(){
    const {user, logout} = this.props
    return (
      <nav className='top-nav'>
        <Logo theme={Icons.logo.lightLogo} />
        <HiddenWorkspace path='/wsp/:workspace' component={SearchContainer} />
        <Profile theme={Icons.profile.lightProfile} user={user} logout={logout}/>
      </nav>
    )
  }
}

export default TopNav;