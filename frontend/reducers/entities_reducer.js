import { combineReducers } from "redux";
import UsersReducer from "./entities/users_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
})

export default EntitiesReducer;