import React from "react";
import { ProtectedRoute, ProtectedWorkspace } from "../utils/route_utils";
import MessagesContainer from './messages/messages_container'
import NewMessageContainer from './messages/new_message_container'
import EditMessageContainer from './messages/edit_message_container'

const MessagesArea = () => (
  <div className='messages-area'>
    <ProtectedWorkspace path='/wsp/:workspace' component={MessagesContainer} />
    <ProtectedWorkspace path='/wsp/:workspace' component={NewMessageContainer} />
    <ProtectedWorkspace exact path='/wsp/:workspace/edit/:messageId' component={EditMessageContainer} />
  </div>
)

export default MessagesArea;