import { combineReducers } from "redux";
import EntitiesReducer from "./entities_reducer";
import ErrorsReducer from "./errors_reducer";

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: ErrorsReducer
})

export default RootReducer;