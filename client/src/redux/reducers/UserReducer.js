import * as types from "../types/UserActionTypes"

export const UserReducer = (state = {user: null}, action) => {

  switch(action.type){
    case types.UPDATE_USER:
      console.log(action?.payload)
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {...state, user: action?.payload};

    default: 
      return state;
  }
}