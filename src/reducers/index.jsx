import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import genres from './genres';
import tracks from './tracks';
import artists from './artists';
import albums from './albums';
import audio from './audio';
import profile from './profile';
import theme from './theme';
import playlists from './playlists';
import locations from './location';

const rootReducer = combineReducers({
	genres,
	tracks,
	artists,
	albums,
	audio,
	profile,
	theme,
	playlists,
	locations,
	routing: routerReducer,
});

export default rootReducer;
