import React from "react";
import * as RealtimeUser from "../../utils/user_config_socket"

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userNames: Object.keys(this.props.users),
      userSearch: '',
      addedUsers: []
    }
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCreateDM = this.handleCreateDM.bind(this)
  }

  handleCreateDM(e) {
    e.preventDefault()
    e.stopPropagation()
    const {addedUsers} = this.state
    const thread = {
      name: addedUsers.join(', '),
      invitees: addedUsers.map(user => this.props.users[user].id),
      is_thread: false
    }
    const user = this.props.user
    const payload = {
      thread: thread,
      user: user.id
    }
    RealtimeUser.receiveThread(payload)
    this.setState({
      userNames: Object.keys(this.props.users),
      userSearch: '',
      addedUsers: []
    })
  }

  handleSearch(e) {
    e.preventDefault()
    const { addedUsers } = this.state
    this.setState({
      userSearch: e.target.value,
      userNames: Object.keys(this.props.users).filter(name => (
        name.includes(e.target.value) && !addedUsers.includes(name)
      ))
    })
  }

  filterNames() {
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
    let { addedUsers } = this.state
    addedUsers.push(e.target.textContent)
    this.setState({ addedUsers }, this.filterNames)
  }

  renderSearch() {
    const { userNames, userSearch } = this.state
    if (userSearch) {
      return (
        <>
        <ul className="search-results">
          {userNames.map((name, idx) => (
            <li
              key={idx}
              onClick={this.handleSearchClick}
            >{name}</li>
          ))}
            <li onClick={this.handleCreateDM}>{this.renderAddedUsers()}</li>
        </ul>
        </>
      )
    }
  }

  renderAddedUsers() {
    const { addedUsers } = this.state
    if (addedUsers.length > 0) {
      return (
        <>
          <ul 
            className="added-users"
          >
            {addedUsers.map((user, idx) => (
              <li
                key={idx}
              >{user}</li>
            ))}
          </ul>
        </>
      )
    }
  }
  
  render(){
    return (
      <div className="search-bar">
        <input 
          type="text" 
          value={this.state.userSearch}
          onChange={this.handleSearch}
          placeholder="Start a dm..."
        />
        {this.renderSearch()}
        {/* {this.renderAddedUsers()} */}
        {/* <div className="add-users-staging">
          {this.renderAddedUsers()}
        </div> */}
      </div>
    )
  }
}

export default Search;