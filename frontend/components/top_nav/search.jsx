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
    this.clearSearch = this.clearSearch.bind(this)
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
    this.clearSearch()
  }

  clearSearch(){
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

  renderClear(){
    const { userSearch } = this.state
    if (userSearch) {
      return (
        <span onClick={this.clearSearch}>&times;</span>
      )
    }
  }

  renderSearch() {
    const { userNames, userSearch } = this.state
    if (userSearch) {
      return (
        <ul className="search-results">
          {userNames.map((name, idx) => (
            <li
              key={idx}
              onClick={this.handleSearchClick}
            >{name}</li>
          ))}
          {this.renderAddedUsers()}
        </ul>
      )
    }
  }

  renderAddedUsers() {
    const { addedUsers } = this.state
    if (addedUsers.length > 0) {
      return (
        <li onClick={this.handleCreateDM}>
          <ul 
            className="added-users"
          >
            {addedUsers.map((user, idx) => (
              <li
                key={idx}
              >{user}</li>
            ))}
          </ul>
        </li>
      )
    }
  }
  
  render(){
    return (
      <div className="search-bar">
        {this.renderClear()}
        <input 
          type="text" 
          value={this.state.userSearch}
          onChange={this.handleSearch}
          placeholder="Start a dm..."
        />
        {this.renderSearch()}
      </div>
    )
  }
}

export default Search;