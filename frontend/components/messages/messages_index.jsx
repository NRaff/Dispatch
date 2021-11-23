import React from "react";
import MessageItem from "./message_item";
import * as Casify from "../../utils/casify"

class MessagesIndex extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers();
    App.cable.subscriptions.create(
      { channel: "ThreadChatChannel"},
      {
        received: data => {
          debugger
          let content = data.message
          // debugger
          let newData = {
            message: content.message,
            threadId: content.thread_id,
            senderId: content.sender_id,
            createdAt: content.created_at,
            id: content.id
          }
          this.props.receiveMessage(newData)
        },
        speak: function(data) {
          return this.perform("speak", data)
        }
      }
    );
  }

  // componentDidUpdate(){
  //   this.bottom.scrollIntoView();
  // }

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
          />
        ))}
        <div ref={this.bottom} />
      </div>
    )
  }
}

export default MessagesIndex;