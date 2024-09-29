import * as types from "../types/DateActionTypes";

const d = new Date();

const initialState = {
  day: d.getDay(),
  month: d.getMonth()+1,
  year: d.getFullYear(),
}

export const DateReducer = (state = initialState , action) => {
  const { type, payload } = action;

  switch(type){
    case types.PREV_MONTH:
      return ({
        ...state, 
        month: payload.month, year: payload.year
      })

      case types.NEXT_MONTH:
        return ({
          ...state, 
          month: payload.month, year: payload.year
        })
    default: 
    return state;
  }
}