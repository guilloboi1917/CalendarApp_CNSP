import * as types from "../types/CalendarActionTypes";

const initialState = {
  menuIsOpen: false,
}

export const CalendarReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type){
    case types.MENU_CLICK:
      return({
        ...state, menuIsOpen: payload.menuIsOpen
      })
    default:
      return state;
  }
}