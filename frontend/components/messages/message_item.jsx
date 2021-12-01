import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/theme";
import * as RealtimeThread from '../../utils/thread_chat_socket'

class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.deleteMessage = this.deleteMessage.bind(this)
  }

  createdTime(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleString()
  }

  deleteMessage() {
    const { message, currentUserId } = this.props
    const payload = {
      id: message.id, 
      sender_id: currentUserId, 
      threadId: message.threadId
    }
    RealtimeThread.deleteMessage(payload)
  }

  renderUDOptions(){
    const { message } = this.props
    return (
      <div className='edit-delete'>
        <Link className='edit-btn' to={`/edit/${message.id}`}>
          <img className={Icons.edit.lightEdit} alt="edit icon" />
        </Link>
        <span 
          onClick={this.deleteMessage}
          className='delete-btn'
        >
          <img className={Icons.delete.lightDelete} alt="delete icon" />
        </span>
      </div>
    )
  }

  renderCurrentUserMessage() {
    const { message, sender } = this.props
    return (
      <div className='full-message current-user'>
        <img className={Icons.profile.lightProfile} alt="profileImg" />
        <div className='message-item'>
          <div className='message-header'>
            <h3>{sender}</h3>
            <p>{this.createdTime(message.createdAt)}</p>
          </div>
          <p>{message.message}</p>
        </div>
        {this.renderUDOptions()}
      </div>
    )
  }

  // unused, considering dropping other users in on the other side
  renderOtherUserFlipped(){
    const { message, sender } = this.props
    return (
      <div className='full-message other-user'>
        <div className='message-item'>
          <div className='message-header'>
            <p>{this.createdTime(message.createdAt)}</p>
            <h3>{sender}</h3>
          </div>
          <p>{message.message}</p>
        </div>
        <img className={Icons.profile.lightProfile} alt="profileImg" />
      </div>
    )
  }

  renderOtherUserMessage() {
    const { message, sender } = this.props
    return (
      <div className='full-message other-user'>
        <img className={Icons.profile.lightProfile} alt="profileImg" />
        <div className='message-item'>
          <div className='message-header'>
            <h3>{sender}</h3>
            <p>{this.createdTime(message.createdAt)}</p>
          </div>
          <p>{message.message}</p>
        </div>
      </div>
    )
  }

  render() {
    const { message, currentUserId } = this.props
    if (currentUserId === message.senderId) {
      return this.renderCurrentUserMessage()
    } else {
      return this.renderOtherUserMessage()
    }
  }
}

export default MessageItem;

