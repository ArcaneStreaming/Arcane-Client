import {GET_TRACKS, GET_NEXT_TRACKS, GET_ALBUM_TRACKS, GET_ARTIST_TRACKS, POST_TRACKS} from '../constants/ActionTypes';

import clone from 'lodash/clone';

const initialState = {
   allTracks: [],
   albumTracks: [],
   artistTracks: []
};

export default function tracks(state = initialState, action) {
   let allTracks = []
   switch (action.type){
      case GET_TRACKS:
         allTracks = action.tracks;
         return {...state, allTracks};
      case GET_NEXT_TRACKS:
         let tracksArray = state.allTracks.results.map(clone);
         tracksArray = tracksArray.concat(action.tracks.results);
        //  console.info(tracksArray);
         allTracks = action.tracks;
         allTracks.results = tracksArray;
         return {...state, allTracks: allTracks};
      case GET_ALBUM_TRACKS:
         const albumTracks = action.tracks;
         return {...state, albumTracks};
      case GET_ARTIST_TRACKS:
         const artistTracks = action.tracks;
         return {...state, artistTracks: artistTracks}
      case POST_TRACKS:
         return state;
      default:
         return state;
   }
}
