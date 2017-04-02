import * as types from '../constants/ActionTypes';

export function changeTheme(theme) {
  console.log(theme.palette)
   return { type: types.CHANGE_THEME, theme}
}
