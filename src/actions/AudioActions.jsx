import * as types from '../constants/ActionTypes'
//
// function shuffle(array) {
//     let counter = array.length;
//
//     // While there are elements in the array
//     while (counter > 0) {
//         // Pick a random index
//         let index = Math.floor(Math.random() * counter);
//
//         // Decrease counter by 1
//         counter--;
//
//         // And swap the last element with it
//         let temp = array[counter];
//         array[counter] = array[index];
//         array[index] = temp;
//     }
//
//     return array;
// }

export function retrieveSongs(shuffle) {
  // This could be written as a thunk or saga
  return fetch("/api/tracks").then(response => response.json()).then(json => ({
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
      songs: json.results
   }));
}
