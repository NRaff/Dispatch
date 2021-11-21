import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    let showMenu = this.state.showMenu ? false : true;
    this.setState({showMenu})
  }

  showMenu(){
    if (this.state.showMenu) {
      return (
        <div className='profile-menu'>
          <button
            className='ui-button'
            onClick={() => logout()}
          >Logout
          </button>
        </div>
      )
    }
  }

  createDropdown() {
    const {logout} = this.props
    return (
      <ul className='profile-dropdown'>
        <li onClick={logout}>Logout</li>
      </ul>
    )
  }


  render() {
    const {theme, user} = this.props
    return (
      <div 
        className='profile'
      >
        <img className={theme} alt="profileImg" />
        <h1>{user ? user.displayName : 'loading...'}</h1>
        {this.createDropdown()}
      </div>
    )
  }
}

export default Profile;