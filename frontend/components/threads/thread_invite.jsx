import React from "react";
import * as RealtimeUser from "../../utils/user_config_socket"

class ThreadInvite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thread: {
        name: this.props.thread,
        invitees: [],
        is_thread: true
      },
      userNames: Object.keys(this.props.users),
      userSearch: '',
      addedUsers: []
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleUserSearch = this.handleUserSearch.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }

  handleCreate(){
    let thread = Object.assign({},this.state.thread)
    this.state.addedUsers.forEach(name => {
      thread.invitees.push(this.props.users[name].id)
    })
    const payload = {
      thread: thread,
      user: this.props.currentUser
    }
    RealtimeUser.receiveThread(payload)
    this.props.history.goBack()
  }

  handleClose(){

  }

  handleNameInput(e){
    e.preventDefault()
    let thread = this.state.thread
    thread['name'] = e.target.value
    this.setState({thread})
  }

  handleUserSearch(e){
    e.preventDefault()
    const {addedUsers} = this.state
    this.setState({
      userSearch: e.target.value,
      userNames: Object.keys(this.props.users).filter(name => (
        name.includes(e.target.value) && !addedUsers.includes(name)
      ))
    })
  }

  filterNames(){
    const { addedUsers } = this.state
    this.setState({
      userNames: Object.keys(this.props.users).filter(name => (
        name.includes(this.state.userSearch) && !addedUsers.includes(name)
      ))
    })
  }

  handleSearchClick(e) {
    e.preventDefault()
    e.stopPropagation()
    let {addedUsers} = this.state
    addedUsers.push(e.target.textContent)
    this.setState({addedUsers}, this.filterNames)
  }

  renderSearch(){
    const {userNames, userSearch} = this.state
    if (userSearch) {
      return (
        <ul className="search-results">
          {userNames.map((name, idx) => (
            <li
              key={idx}
              onClick={this.handleSearchClick}
            >{name}</li>
          ))}
        </ul>
      )
    }
  }

  renderAddedUsers(){
    const {addedUsers} = this.state
    if (addedUsers.length > 0) {
      return (
        <ul className="added-users">
          {addedUsers.map((user, idx) => (
            <li
              key={idx}
            >{user}</li>
          ))}
        </ul>
      )
    }
  }
  render(){
    const {user} = this.props
    const {thread, userSearch} = this.state
    return (
      <div
        className='thread-invite-overlay'
      >
        <div
          className='thread-invite'
        >
          <header>
            <h1>Invite Members</h1>
            <span
              onClick={this.props.history.goBack}
            >&times;</span>
          </header>
          {this.renderAddedUsers()}
          <input
            id="name"
            type="text"
            value={thread.name}
            onChange={this.handleNameInput}
          />
          <input 
            id="userSearch"
            type="text" 
            value={userSearch}
            placeholder="Search for users"
            onChange={this.handleUserSearch}
          />
          {this.renderSearch()}
          <button
            className="ui-button"
            onClick={this.handleCreate}
          >Create Thread</button>
        </div>
      </div>
    )
  }
}

export default ThreadInvite;