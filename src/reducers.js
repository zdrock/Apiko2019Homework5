import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import tasksReducer from "./reducers/tasksReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks: tasksReducer
  });
