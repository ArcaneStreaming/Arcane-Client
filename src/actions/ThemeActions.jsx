import * as types from '../constants/ActionTypes';

export function changeTheme(theme) {
   return { type: types.CHANGE_THEME, theme}
}
