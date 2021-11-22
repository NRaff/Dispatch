import { combineReducers } from "redux";
import MessageErrorsReducer from "./errors/message_errors_reducer";
import ThreadErrorsReducer from "./errors/thread_errors_reducer";
import UserErrorsReducer from "./errors/user_errors_reducer";

const ErrorsReducer = combineReducers({
  userErrors: UserErrorsReducer,
  messageErrors: MessageErrorsReducer,
  threadErrors: ThreadErrorsReducer
})

export default ErrorsReducer;