import React from "react";
import { ProtectedRoute, ProtectedWorkspace } from "../utils/route_utils";
import ThreadsContainer from './threads/threads_container'
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'
import ThreadInviteContainer from './threads/thread_invite_container'
import WorkspaceContainer from './workspaces/ws_index_container'
import WorkspaceHeader from "./workspaces/ws_header";
import WorkspaceInfo from "./workspaces/ws_info";

const MainApp = (props) => (
  <div className='main-app'>
    <ProtectedRoute path='/' component={WorkspaceContainer} />
    <ProtectedWorkspace path='/:workspace' component={ThreadsContainer} />
    <ProtectedWorkspace exact path='/:workspace/info' component={WorkspaceInfo} />
    <ProtectedWorkspace exact path='/:workspace/new/:thread' component={ThreadInviteContainer} />
    <div className='messages-area'>
      <ProtectedWorkspace path='/:workspace' component={MessagesContainer} />
      <ProtectedWorkspace path='/:workspace' component={NewMessageContainer} />
      <ProtectedWorkspace exact path='/:workspace/edit/:messageId' component={EditMessageContainer} />
    </div>
  </div>
)

export default MainApp;