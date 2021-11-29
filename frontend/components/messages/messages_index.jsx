import React from "react";
import MessageItem from "./message_item";
import * as RealtimeUser from "../../utils/user_config_socket"


class MessagesIndex extends React.Component {
  constructor(props){
    super(props)
    this.bottom = React.createRef()
  }

  componentDidUpdate(){
    this.bottom.current.scrollIntoView();
  }

  componentDidMount() {
    // this.props.fetchUsers();
    const {currentUserId} = this.props
    // RealtimeUser.receiveAllUsers(currentUserId)
  }

  render() {
    const { messages, users, updateMessage, deleteMessage} = this.props
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