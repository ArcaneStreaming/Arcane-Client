import { CHANGE_THEME } from '../constants/ActionTypes'
import { themeEnum, themes } from '../constants/material-ui-theme'

const initialState = {
   themeIndex: themeEnum.ARCANE_DARK,
   currentTheme: themes[themeEnum.ARCANE_DARK]
}

export default function theme(state = initialState, action) {
   switch (action.type) {
      case CHANGE_THEME:
         const newIndex = action.theme;
         const newTheme = themes[newIndex];
         return {...state, themeIndex: newIndex, currentTheme: newTheme}
      default:
         return state;
   }
}
