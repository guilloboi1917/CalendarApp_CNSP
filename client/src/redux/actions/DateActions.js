import * as types from "../types/DateActionTypes";

export const prevMonth = (date) => {

  const prevMonth = (date.month > 1 ? date.month - 1 : 12);
  const prevYear = (prevMonth === 12 ? date.year - 1: date.year);

  return ({
    type: types.PREV_MONTH, payload: {month: prevMonth, year: prevYear } 
  })
}

export const nextMonth = (date) => {

  const nextMonth = (date.month > 11 ? 1 : date.month + 1);
  const nextYear = (nextMonth === 1 ? date.year + 1: date.year );

  return ({
    type: types.PREV_MONTH, payload: {month: nextMonth, year: nextYear } 
  })
}
