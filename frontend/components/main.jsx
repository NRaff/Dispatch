import React from "react";
import { ProtectedRoute, ProtectedWorkspace } from "../utils/route_utils";
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'
import ThreadInviteContainer from './threads/thread_invite_container'
import WorkspaceContainer from './workspaces/ws_index_container'
import WorkspaceInfo from "./workspaces/ws_info";
import WorkspaceJoinContainer from "./workspaces/ws_join_container"

const MainApp = (props) => (
  <div className='main-app'>
    <ProtectedRoute path='/' component={WorkspaceContainer} />
    <ProtectedRoute path='/join-workspace' component={WorkspaceJoinContainer} />
    <ProtectedWorkspace path='/wsp/:workspace' component={ThreadsContainer} />
    <ProtectedWorkspace exact path='/wsp/:workspace/info' component={WorkspaceInfo} />
    <ProtectedWorkspace path='/wsp/:workspace/new/:thread' component={ThreadInviteContainer} />
    <div className='messages-area'>
      <ProtectedWorkspace path='/wsp/:workspace' component={MessagesContainer} />
      <ProtectedWorkspace path='/wsp/:workspace' component={NewMessageContainer} />
      <ProtectedWorkspace exact path='/wsp/:workspace/edit/:messageId' component={EditMessageContainer} />
    </div>
  </div>
)

export default MainApp;