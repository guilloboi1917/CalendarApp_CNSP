import * as types from "../types/AuthActionTypes";

export const authReducer = (state = { authData: null}, action) => {
  //const { type, payload } = action;

  switch(action.type){
    case types.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {...state, authData: action?.data};

    case types.LOGOUT:
      localStorage.clear();
      return {...state, authData:null};

    default:
      return state;
  }
}
