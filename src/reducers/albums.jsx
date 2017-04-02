import {GET_ALBUMS, GET_ARTIST_ALBUMS, GET_NEXT_ALBUMS} from '../constants/ActionTypes';

const initialState = {
   allAlbums: [],
   artistAlbums: []
};
export default function albums(state = initialState, action) {
  let allAlbums = []
  switch (action.type){
   case GET_ALBUMS:
      allAlbums = action.albums;
      return {...state, allAlbums};
   case GET_NEXT_ALBUMS:
      let albumsArray = state.allAlbums.results;
      albumsArray = albumsArray.concat(action.albums.results);
      allAlbums = action.albums;
      allAlbums.results = albumsArray;
      return {...state, allAlbums: allAlbums};
   case GET_ARTIST_ALBUMS:
      const artistAlbums = action.albums;
      return {...state, artistAlbums};
    default:
       return state;
  }
};
