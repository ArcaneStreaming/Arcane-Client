import { GET_USER_PLAYLISTS, GET_PLAYLIST_TRACKS } from '../constants/ActionTypes';

const initialState = {
   playlists: [],
   tracks: []
}

export default function playlists(state = initialState, action) {
   switch (action.type) {
      case GET_USER_PLAYLISTS:
         return {...state, playlists: action.playlists}
      case GET_PLAYLIST_TRACKS:
         return {...state, tracks: action.tracks}
      default:
         return state;
   }
}
