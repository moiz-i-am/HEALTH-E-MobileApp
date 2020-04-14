import { combineReducers } from "redux";

import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import userReducer from "./userReducer";
import scheduleReducer from "./schedulingReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  schedule: scheduleReducer
});
