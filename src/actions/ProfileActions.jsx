import * as types from '../constants/ActionTypes';

const host = '/api';

export function getArtistProfile(id) {
	return fetch(host + '/artists/?id=' + id)
		.then(response => response.json())
		.then(json => ({
			type: types.GET_ARTIST_PROFILE,
			profile: json.results[0]
		}));
}

export function getArtistMembers(id) {
	return fetch(host + '/users/users/?artist=' + id)
	//return fetch(host + '/users/users/')
		.then(response => response.json())
		.then(json => ({
			type: types.GET_ARTIST_MEMBERS,
			members: json.results
		}));
}

export function getArtistSummaries(id) {
	return fetch(host + '/artists/' + id + '/summary/')
		.then(response => response.json())
		.then(json => ({
			type: types.GET_ARTIST_SUMMARIES,
			summaries: json.results
		}));
}

export function getCurrentUser(id) {
	return fetch(host + '/users/listeners/' + id + '/')
		.then(response => response.json())
		.then(json => ({
			type: types.GET_CURRENT_USER,
			user: json
		}));
}

export function toggleUserView(isArtistView) {
	return {
		type: types.TOGGLE_USER_VIEW,
		isArtistView: isArtistView
	};
}
