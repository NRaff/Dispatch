import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import RootReducer from "../reducers/root_reducer";

// Todo: Remember to remove logger for production
const configureStore = preloadedState => (
  createStore(RootReducer,preloadedState, applyMiddleware(thunk, logger))
)

export default configureStore;