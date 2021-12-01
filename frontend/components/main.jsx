import React from "react";
import { ProtectedRoute } from "../utils/route_utils";
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'
import ThreadInviteContainer from './threads/thread_invite_container'

const MainApp = (props) => (
  <div className='main-app'>
    <ProtectedRoute path='/' component={ThreadsContainer} />
    <ProtectedRoute exact path='/new/:thread' component={ThreadInviteContainer} />
    <div className='messages-area'>
      <ProtectedRoute path='/' component={MessagesContainer} />
      <ProtectedRoute path='/' component={NewMessageContainer} />
      <ProtectedRoute exact path='/edit/:messageId' component={EditMessageContainer} />
    </div>
  </div>
)

export default MainApp;