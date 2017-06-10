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

export function createNewPlaylist(name, userID) {
   let postData = {
      name: name,
      user: userID,
      tracks: []
   }
   return fetch(host + "/users/playlists/", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(postData)
   }).then(response => response.json()).then((json) => ({
      type: types.CREATE_NEW_PLAYLIST,
      payload: postData
   }));
}

export function deletePlaylist(playlist) {
   console.info('playlist in DELETE_PLAYLIST', playlist);
   return fetch(host + "/users/playlists/" + playlist.id, {
      method: "DELETE"
   }).then(response => response.ok()).then((json) => ({
      type: types.DELETE_PLAYLIST,
      payload: playlist
   }));
}
