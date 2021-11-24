import React from "react";
import MessageItem from "./message_item";
import * as Casify from "../../utils/casify"

class MessagesIndex extends React.Component {
  constructor(props){
    super(props)
    this.bottom = React.createRef()
  }

  componentDidUpdate(){
    this.bottom.current.scrollIntoView();
  }

  componentDidMount() {
    this.props.fetchUsers();
    App.cable.subscriptions.create(
      { channel: "ThreadChatChannel"},
      {
        received: data => {
          this.props.dispatch(data)
        },
        receiveMessage: function(data) {
          return this.perform("receive_message", data)
        },
        receiveThreadMessages: function(data) {
          return this.perform("receive_thread_messages", data)
        },
        deleteMessage: function(data) {
          return this.perform("delete_message", data)
        }
      }
    );
  }

  render() {
    const {messages, users, createMessage, updateMessage, deleteMessage} = this.props
    return (
      <div className='messages-index'>
        {messages.map(msg => (
          <MessageItem 
            key={msg.id} 
            message={msg} 
            updateMessage={updateMessage} 
            deleteMessage={deleteMessage}
            sender={users[msg.senderId].displayName}
            currentUserId={this.props.currentUserId}
          />
        ))}
        <div ref={this.bottom} />
      </div>
    )
  }
}

export default MessagesIndex;