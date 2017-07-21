/**********************************************************
 * Src: https://github.com/jslauthor/react-audio-component
 **********************************************************/
import {
	INITIALIZE, ERROR,
	UPDATE_VOLUME, NEXT, PREVIOUS,
	PLAY, SET_TIME, SET_PROGRESS,
	TOGGLE_FAVORITE, TOGGLE_REPEAT,
	UPDATE_POSITION, PAUSE, TOGGLE_LOOP,
	TOGGLE_SHUFFLE, ADD_TO_QUEUE,
	START_GENRE_RADIO, START_ARTIST_RADIO,
	PLAY_ALBUM_TRACKS, SET_AUDIO
} from '../constants/ActionTypes';

import clone from 'lodash/clone';
import { host } from '../constants/host';

const initialState = {
	audio: {},
	isPlaying: false,
	isFavorite: false,
	isRepeating: false,
	isLooping: false,
	isShuffling: true,
	percent: 0,
	volume: 65,
	progress: {},
	duration: 0,
	repeat: false,
	upcoming: [],
	completed: [],
	currentlyPlaying: null,
	defaultSong: {
		'id': -1,
		'album': '',
		'url': host + 'static/default.mp3',
		'name': 'Waiting...',
		'artist': 'No song loaded',
		'favorite': false
	}
};


function getAudioState(audio) {
	let test = {
		isPlaying: !audio.paused,
		percent: audio.currentTime / audio.duration,
		progress: audio.buffered,
		duration: audio.duration,
		isLooping: audio.loop,
		error: audio.error
	};

	return test;
}

function resetAudio(audio) {
	// need to reset the song if it's the same file
	audio.currentTime = 0;
	const src = audio.src;
	audio.src = null;
	audio.src = src;
}

function shuffle(array) {
	// let saved = array.shift();
	let counter = array.length;
	// While there are elements in the array
	while (counter > 0) {
	// Pick a random index
		let index = Math.floor(Math.random() * counter);
		// Decrease counter by 1
		counter--;
		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	//  array.unshift(saved)
	return array;
}


export default function audio(state = initialState, action) {
	const newAudio = state.audio;
	switch (action.type) {
		case INITIALIZE:
			let songsArray = shuffle(action.songs);
			let firstSong = songsArray.shift();
			//  const songsArray = sortBy(action.songs, ['id']);
			return { ...state, currentlyPlaying: firstSong, upcoming: songsArray };
		case PLAY:
			if (newAudio.paused)
				newAudio.play();
			else
				newAudio.pause();
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case PAUSE:
			newAudio.pause();
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case ERROR:
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case NEXT:
			resetAudio(newAudio);
			let nextUpcoming = state.upcoming.map(clone);
			let nextSong = nextUpcoming.shift();
			let nextCompleted = state.completed.map(clone);
			nextCompleted.push(state.currentlyPlaying);
			return {
				...state,
				upcoming: nextUpcoming,
				currentlyPlaying: nextSong,
				completed: nextCompleted,
				audio: newAudio,
				...getAudioState(newAudio)
			};
		case PREVIOUS:
			resetAudio(newAudio);
			let prevUpcoming = state.upcoming.map(clone);
			prevUpcoming.unshift(state.currentlyPlaying);
			let prevCompleted = state.completed.map(clone);
			let prevSong = prevCompleted.pop();
			return {
				...state,
				upcoming: prevUpcoming,
				completed: prevCompleted,
				currentlyPlaying: prevSong,
				audio: newAudio,
				...getAudioState(newAudio)
			};
		case UPDATE_VOLUME:
			newAudio.volume = action.volume / 100;
			return { ...state, audio: newAudio, volume: action.volume };
		case SET_TIME:
			newAudio.percent = newAudio.currentTime / newAudio.duration;
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case UPDATE_POSITION:
			newAudio.currentTime = action.percent * newAudio.duration;
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case SET_PROGRESS:
			return { ...state, ...getAudioState(state.audio) };
		case TOGGLE_FAVORITE:
			let currentSong = state.currentSong;
			currentSong.favorite = !currentSong.favorite;
			return { ...state, currentSong: currentSong };
		case TOGGLE_REPEAT:
			return { ...state, isRepeating: !state.isRepeating };
		case TOGGLE_LOOP:
			newAudio.loop = !newAudio.loop;
			return { ...state, audio: newAudio, ...getAudioState(newAudio) };
		case TOGGLE_SHUFFLE:
			return { ...state, isShuffling: !state.isShuffling, upcoming: shuffle(state.upcoming.map(clone)) };
		case ADD_TO_QUEUE:
			let upcoming = state.upcoming.map(clone);
			upcoming = upcoming.concat(action.songs);
			return { ...state, upcoming: upcoming };
		case START_GENRE_RADIO:
		case START_ARTIST_RADIO:
		case PLAY_ALBUM_TRACKS:
			newAudio.src = action.tracks[0].url;
			resetAudio(newAudio);
			return {
				...state,
				currentlyPlaying: action.tracks[0],
				upcoming: action.tracks.slice(1),
				audio: newAudio,
				...getAudioState(newAudio)
			};
		case SET_AUDIO:
			return { ...state, audio: action.audio, ...getAudioState(newAudio) };

		default:
			return state;
	}
}
