import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import pageURLReducer from "./otherReducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
  pageURL: pageURLReducer,
});

export default rootReducer;
