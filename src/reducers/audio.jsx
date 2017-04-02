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
   START_GENRE_RADIO
 } from '../constants/ActionTypes'

 // import find from 'lodash/find';
 // import findIndex from 'lodash/findIndex';
 // import sortBy from 'lodash/sortBy';
 // import indexOf from 'lodash/indexOf';
 import clone from 'lodash/clone';

 const initialState = {
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
     "id": -1,
     "album": "",
     "url": "http://localhost:8000/static/default.mp3",
     "name": "Waiting...",
     "artist": "No song loaded",
     "favorite": false
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
   }

   return test;
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
   switch (action.type) {
     case INITIALIZE:
       let songsArray = shuffle(action.songs);
      //  console.info("IN audio INITIALIZE", songsArray)
       let firstSong = songsArray.shift();
      //  const songsArray = sortBy(action.songs, ['id']);
       return {...state, currentlyPlaying: firstSong, upcoming: songsArray };
     case PLAY:
     case PAUSE:
     case ERROR:
       return {...state, ...getAudioState(action.audio) };
     case NEXT:
       let nextUpcoming = state.upcoming.map(clone);
       let nextSong = nextUpcoming.shift();
       let nextCompleted = state.completed.map(clone);
       nextCompleted.push(state.currentlyPlaying);
       return {
         ...state,
         upcoming: nextUpcoming,
         currentlyPlaying: nextSong,
         completed: nextCompleted,
         ...getAudioState(action.audio)
       };
     case PREVIOUS:
        let prevUpcoming = state.upcoming.map(clone);
        prevUpcoming.unshift(state.currentlyPlaying);
        let prevCompleted = state.completed.map(clone);
        let prevSong = prevCompleted.pop();
      //   console.info("IN audio PREVIOUS unshift");
       return {
         ...state,
         upcoming: prevUpcoming,
         completed: prevCompleted,
         currentlyPlaying: prevSong,
         ...getAudioState(action.audio)
       };
     case UPDATE_VOLUME:
      //  console.info("IN audio UPDATE_VOLUME", state);
       return {...state, volume: action.volume };
     case SET_TIME:
       return {...state, ...getAudioState(action.audio) };
     case UPDATE_POSITION:
       return {...state, ...getAudioState(action.audio) };
     case SET_PROGRESS:
       return {...state, ...getAudioState(action.audio) };
     case TOGGLE_FAVORITE:
         let currentSong = state.currentSong;
         currentSong.favorite = !currentSong.favorite;
       return {...state, currentSong: currentSong };
     case TOGGLE_REPEAT:
       return {...state, isRepeating: !state.isRepeating };
     case TOGGLE_LOOP:
       return {...state, ...getAudioState(action.audio) };
     case TOGGLE_SHUFFLE:
       return {...state, isShuffling: !state.isShuffling, upcoming: shuffle(state.upcoming.map(clone)) };
     case ADD_TO_QUEUE:
        let upcoming = state.upcoming.map(clone);
        upcoming = upcoming.concat(action.songs);
        console.info("IN audio ADD_TO_QUEUE", action.songs);
       return {...state, upcoming: upcoming };
     case START_GENRE_RADIO:
        return {...state, upcoming: action.songs}
     default:
      //   console.info("IN audio DEFAULT", state);
       return state
   }
 }
