import { combineReducers } from "redux";
import ThreadsReducer from "./entities/threads_reducer";
import UsersReducer from "./entities/users_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  threads: ThreadsReducer
})

export default EntitiesReducer;