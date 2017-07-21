import * as types from '../constants/ActionTypes';

const host = '/api/albums';

export function getAlbums() {
	return fetch(host).then(response => response.json()).then(json => ({
		type:types.GET_ALBUMS,
		albums: json
	}));
}
export function getArtistAlbums(artistID) {
	return fetch(host+'?artist='+artistID+'&ordering=name').then(response => response.json()).then(json => ({
		type:types.GET_ARTIST_ALBUMS,
		albums: json
	}));
}
export function getNextAlbums(url) {
	return fetch(url).then(response => response.json()).then(json => ({
		type:types.GET_NEXT_ALBUMS,
		albums: json
	}));
}
