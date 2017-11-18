import * as types from '../constants/ActionTypes.jsx';

const host = '/api/locations';

export function getLocations() {
	return fetch(host).then(response => response.json()).then(json => ({
		type: types.GET_LOCATIONS,
		payload: json,
	}));
}
