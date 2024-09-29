import * as types from "../types/CalendarActionTypes";

export const menuClick = (menu) => {
  return({
    type: types.MENU_CLICK, payload: { menuIsOpen: !menu.menuIsOpen }
  })
}
