import * as types from "../types/TaskActionTypes";

export const TaskReducer = (state = [], action) => {
  const { type, payload } = action;

  switch(type){
    case types.FETCH_TASK:
      return payload;

    case types.CREATE_TASK:
      return [...state, action.payload];
    
    case types.UPDATE_TASK:
      return state.map((task) => task._id === action.payload._id ? action.payload : task);

    case types.DELETE_TASK:
      return state.filter((task) => task._id !== action.payload);

    default: 
      return state;
  }
}
