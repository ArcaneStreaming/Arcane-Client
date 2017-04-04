import * as types from '../constants/ActionTypes';

const host = "/api";

export function getUserPlaylists(userID) {
   return fetch(host + "/users/playlists/?user=" + userID)
   .then(response => response.json())
   .then(json => ({
      type: types.GET_USER_PLAYLISTS,
      playlists: json.results
   }));
}

export function getPlaylistTracks(playlistID) {
   return fetch(host + "/users/playlists/" + playlistID + "/tracks/")
   .then(response => response.json())
   .then(json => ({
      type: types.GET_PLAYLIST_TRACKS,
      tracks: json.tracks
   }))
}
