import React from "react";
import { ProtectedRoute, ProtectedWorkspace } from "../utils/route_utils";
import ThreadsContainer from './threads/threads_container'
import ThreadInviteContainer from './threads/thread_invite_container'
import WorkspaceContainer from './workspaces/ws_index_container'
import WorkspaceInfo from "./workspaces/ws_info";
import {WorkspaceJoinContainer, WorkspaceCreateContainer} from "./workspaces/ws_join_container"
import MessagesArea from "./workspace_messages";

const MainApp = (props) => (
  <div className='main-app'>
    <ProtectedRoute path='/' component={WorkspaceContainer} />
    <ProtectedRoute path='/join-workspace' component={WorkspaceJoinContainer} />
    <ProtectedRoute path='/create-workspace' component={WorkspaceCreateContainer} />
    <ProtectedWorkspace path='/wsp/:workspace' component={ThreadsContainer} />
    <ProtectedWorkspace exact path='/wsp/:workspace/info' component={WorkspaceInfo} />
    <ProtectedWorkspace path='/wsp/:workspace/new/:thread' component={ThreadInviteContainer} />
    <ProtectedWorkspace path='/wsp/:workspace' component={MessagesArea} />
  </div>
)

export default MainApp;