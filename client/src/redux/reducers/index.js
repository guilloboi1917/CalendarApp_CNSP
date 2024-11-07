import { combineReducers } from "redux";
import { DateReducer } from "./DateReducer";
import { CalendarReducer } from "./CalendarReducer";
import { TaskReducer } from "./TaskReducer";
import { authReducer } from "./AuthReducer";
import { UserReducer } from "./UserReducer";

export default combineReducers({
  date:DateReducer, 
  calendar:CalendarReducer,
  task:TaskReducer,
  auth: authReducer,
  user: UserReducer
});
