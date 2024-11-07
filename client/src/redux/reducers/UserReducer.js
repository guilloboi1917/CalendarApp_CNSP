import * as types from "../types/UserActionTypes"

export const UserReducer = (state = {user: null}, action) => {

  const { type, payload } = action;

  switch(type){
    case types.UPDATE_USER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {...state, user: action?.payload};

    default: 
      return state;
  }
}