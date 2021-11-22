import React from "react";
import MessageItem from "./messages_item";

class MessagesIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {messages, createMessage, updateMessage, deleteMessage} = this.props
    return (
      <div className='messages-index'>
        {messages.map(msg => (
          <MessageItem message={msg} updateMessage={updateMessage} deleteMessage={deleteMessage} />
        ))}
      </div>
    )
  }
}

export default MessagesIndex;