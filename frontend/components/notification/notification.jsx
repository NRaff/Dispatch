import React from "react"
import { Icons } from "../../utils/theme";

class Notification extends React.Component {
  constructor(props){
    super(props)
    this.closeNotification = this.closeNotification.bind(this)
  }
  componentDidMount() {

  }

  translateDM(){
    const {fromThread, users, currentUser} = this.props
    const otherUsers = fromThread.userIds.filter(id => id != currentUser)
    const userNames = otherUsers.map(id => users[id].displayName)
    if (userNames.length <= 3) {
      return (`New message from ${userNames.join(',')}.`)
    } else {
      return (`New message from a group that you're a part of.`)
    }
  }

  translateThread(){
    const {fromThread, users, currentUser} = this.props
    return (`New message from ${fromThread.name}.`)
  }

  closeNotification(){
    const note = document.getElementsByClassName('active-notification')[0]
    note.classList.remove('active-notification')
    setTimeout(this.props.clearNotification,500)
    // this.props.clearNotification()
  }

  renderMessage(){
    const {fromThread} = this.props
    if (fromThread) {
      if (fromThread.isThread) {
        return this.translateThread()
      } else {
        return this.translateDM()
      }
    }
  }
  render() {
    const {fromThread} = this.props
    if (fromThread) {
      setTimeout(this.closeNotification, 5000)
      return (
        <header className='notification active-notification'>
          <span onClick={this.closeNotification}>&times;</span>
          <img className={Icons.notification.darkNote} alt="bell icon" />
          <h1>{this.renderMessage()}</h1>
        </header>
      )
    } else {
      return null
    }
  }
}

export default Notification;