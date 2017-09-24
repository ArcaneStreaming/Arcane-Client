import {
	GET_USER_PLAYLISTS, GET_PLAYLIST_TRACKS, CREATE_NEW_PLAYLIST,
	DELETE_PLAYLIST, ADD_TRACK_TO_PLAYLIST,
} from '../constants/ActionTypes';

const initialState = {
	playlists: null,
	tracks: null,
};

export default function playlists(state = initialState, action) {
	switch (action.type) {
		case GET_USER_PLAYLISTS:
			return { ...state, playlists: action.playlists };
		case GET_PLAYLIST_TRACKS:
			return { ...state, tracks: action.tracks };
		case CREATE_NEW_PLAYLIST:
			return { ...state, playlists: [...state.playlists, action.payload] };
		case DELETE_PLAYLIST:
			const indexOfDeleted = state.playlists.indexOf(action.payload);
			const playlistsAfterDeletion = [
				...state.playlists.slice(0, indexOfDeleted),
				...state.playlists.slice(indexOfDeleted + 1),
			];
			return { ...state, playlists: playlistsAfterDeletion };
		case ADD_TRACK_TO_PLAYLIST:
			console.info(action.payload);
			return {
				...state, playlists: [
					...state.playlists.filter(playlist => playlist.id !== action.payload.id),
					action.payload,
				].sort((a, b) => a.id < b.id),
			};
		default:
			return state;
	}
}
