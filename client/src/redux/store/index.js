import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";

const configureStore = createStore(
  combineReducers,
  compose(applyMiddleware(thunk))
);

export default configureStore;