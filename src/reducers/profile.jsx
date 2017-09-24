import {
	GET_ARTIST_PROFILE, GET_ARTIST_MEMBERS, GET_ARTIST_SUMMARIES,
	GET_CURRENT_USER, TOGGLE_USER_VIEW,
} from '../constants/ActionTypes';

const initialState = {
	artist: {},
	members: [],
	summaries: [],
	currentUser: {},
};

export default function profile(state = initialState, action) {
	switch (action.type) {
		case GET_ARTIST_PROFILE:
			return { ...state, artist: action.profile };
		case GET_ARTIST_MEMBERS:
			return { ...state, members: action.members };
		case GET_ARTIST_SUMMARIES:
			return { ...state, summaries: action.summaries };
		case GET_CURRENT_USER:
			console.info('get current user', action);
			if (action.user)
				return { ...state, currentUser: action.user };
			else {
				return { ...state, currentUser: {} };
			}
		case TOGGLE_USER_VIEW:
			if (action.isArtistView)
				return { ...state, currentUser: { ...state.currentUser, artist: 1 } };
			else
				return { ...state, currentUser: { ...state.currentUser, artist: null } };
		default:
			return state;
	}
}
