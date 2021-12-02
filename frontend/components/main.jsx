import React from "react";
import { ProtectedRoute } from "../utils/route_utils";
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'
import ThreadInviteContainer from './threads/thread_invite_container'
import WorkspaceContainer from './workspaces/ws_index_container'

const MainApp = (props) => (
  <div className='main-app'>
    <ProtectedRoute path='/' component={WorkspaceContainer} />
    <ProtectedRoute path='/:workspace' component={ThreadsContainer} />
    <ProtectedRoute exact path='/:workspace/new/:thread' component={ThreadInviteContainer} />
    <div className='messages-area'>
      <ProtectedRoute path='/:workspace' component={MessagesContainer} />
      <ProtectedRoute path='/:workspace' component={NewMessageContainer} />
      <ProtectedRoute exact path='/:workspace/edit/:messageId' component={EditMessageContainer} />
    </div>
  </div>
)

export default MainApp;