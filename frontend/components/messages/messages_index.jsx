import React from "react";
import MessageItem from "./message_item";

class MessagesIndex extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers();
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
          />
        ))}
      </div>
    )
  }
}

export default MessagesIndex;