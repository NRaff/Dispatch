import { combineReducers } from "redux";
import MessagesReducer from "./entities/messages_reducer";
import ThreadsReducer from "./entities/threads_reducer";
import UsersReducer from "./entities/users_reducer";
import WorkspacesReducer from "./entities/workspaces_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  workspaces: WorkspacesReducer,
  threads: ThreadsReducer,
  messages: MessagesReducer,
})

export default EntitiesReducer;