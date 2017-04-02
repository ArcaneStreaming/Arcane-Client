import {GET_ARTISTS, GET_GENRE_ARTISTS, GET_NEXT_ARTISTS} from '../constants/ActionTypes';

const initialState = {
   allArtists: [],
   genreArtists: []
};
export default function artists(state = initialState, action) {
  let allArtists = []
  switch (action.type){
    case GET_ARTISTS:
      allArtists = action.artists;
      return { ...state, allArtists};
    case GET_NEXT_ARTISTS:
      let artistsArray = state.allArtists.results;
      artistsArray = artistsArray.concat(action.artists.results);
      allArtists = action.artists;
      allArtists.results = artistsArray;
      return {...state, allArtists: allArtists};
    case GET_GENRE_ARTISTS:
      const genreArtists = action.artists;
      return {...state, genreArtists};
    default:
      return state;
   }
}
