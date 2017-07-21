import * as types from '../constants/ActionTypes';

export function retrieveSongs(shuffle) {
	// This could be written as a thunk or saga
	return fetch('/api/tracks')
		.then(response => response.json())
		.then(json => ({
			type: types.INITIALIZE,
			songs: shuffle ? shuffle(sortBy(json.results, ['id'])).slice(0,7) : json.results //eslint-disable-line
		}));
}


export function play() {
	return { type: types.PLAY };
}

export function pause() {
	return { type: types.PAUSE };
}

export function next() {
	return { type: types.NEXT };
}

export function previous() {
	return { type: types.PREVIOUS };
}

export function updateVolume(volume) {
	return { type: types.UPDATE_VOLUME, volume };
}

export function setTime() {
	return { type: types.SET_TIME };
}

export function setProgress() {
	return { type: types.SET_PROGRESS };
}

export function setError() {
	return { type: types.ERROR };
}

export function updatePosition(percent) {
	return { type: types.UPDATE_POSITION, percent };
}

export function toggleFavorite() {
	return { type: types.TOGGLE_FAVORITE };
}

export function toggleRepeat() {
	return { type: types.TOGGLE_REPEAT };
}

export function toggleLoop() {
	return { type: types.TOGGLE_LOOP };
}

export function toggleShuffle() {
	return { type: types.TOGGLE_SHUFFLE };
}

export function setAutoPlay(value) {
	return { type: types.TOGGLE_SHUFFLE, value };
}

export function addToQueue(songs) {
	return { type: types.ADD_TO_QUEUE, songs };
}

export function startGenreRadio(genreID) {
	return fetch('/api/tracks/?genre=' + genreID)
		.then(response => response.json())
		.then(json => ({
			type: types.START_GENRE_RADIO,
			tracks: json.results
		}));
}

export function startArtistRadio(artistID) {
	return fetch('/api/tracks/?artist=' + artistID)
		.then(response => response.json())
		.then(json => ({
			type: types.START_ARTIST_RADIO,
			tracks: json.results
		}));
}

export function playAlbumTracks(tracks) {
	return {
		type: types.PLAY_ALBUM_TRACKS,
		tracks: tracks
	};
}

export function setAudio(audio) {
	return { type: types.SET_AUDIO, audio: audio };
}
