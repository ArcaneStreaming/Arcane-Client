import * as types from '../constants/ActionTypes';

export function retrieveSongs(shuffle) {
	// This could be written as a thunk or saga
	return fetch("/api/tracks")
	.then(response => response.json())
	.then(json => ({
		type: types.INITIALIZE,
		songs: shuffle ? shuffle(sortBy(json.results, ['id'])).slice(0,7) : json.results
	}));
};


export function play(audio) {
	if (audio.paused)
		audio.play();
	else
		audio.pause();

  return { type: types.PLAY, audio }
}

export function pause(audio) {
	audio.pause();
	return { type: types.PAUSE, audio }
}

function resetAudio(audio) {
	// need to reset the song if it's the same file
	audio.currentTime = 0;
	const src = audio.src;
	audio.src = null;
	audio.src = src;
}

export function next(audio) {
	resetAudio(audio)
	return { type: types.NEXT, audio }
}

export function previous(audio) {
	resetAudio(audio)
return { type: types.PREVIOUS, audio }
}

export function updateVolume(audio, volume) {
	audio.volume = volume/100;
return { type: types.UPDATE_VOLUME, volume }
}

export function setTime(audio) {
	const percent = audio.currentTime / audio.duration;
	return { type: types.SET_TIME, audio }
}

export function setProgress(audio) {
	return { type: types.SET_PROGRESS, audio }
}

export function setError(audio) {
	return { type: types.ERROR, audio }
}

export function updatePosition(audio, percent) {
	audio.currentTime = percent * audio.duration;
	return { type: types.UPDATE_POSITION, audio }
}

export function toggleFavorite() {
	return { type: types.TOGGLE_FAVORITE }
}

export function toggleRepeat() {
	return { type: types.TOGGLE_REPEAT }
}

export function toggleLoop(audio) {
	audio.loop = !audio.loop;
	return { type: types.TOGGLE_LOOP, audio }
}

export function toggleShuffle() {
	return { type: types.TOGGLE_SHUFFLE }
}

export function setAutoPlay(value) {
	return { type: types.TOGGLE_SHUFFLE, value }
}

export function addToQueue(songs) {
	return { type: types.ADD_TO_QUEUE, songs}
}

export function startGenreRadio(genreID) {
	return fetch("/api/tracks/?genre=" + genreID)
	.then(response => response.json())
	.then(json => ({
		type: types.START_GENRE_RADIO,
		tracks: json.results
	}));
}

export function startArtistRadio(artistID) {
	return fetch("/api/tracks/?artist=" + artistID)
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
	}
}
