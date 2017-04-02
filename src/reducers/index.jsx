
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';
import artists from './artists';
import albums from './albums';
import audio from './audio';
import profile from './profile';
import theme from './theme';
import playlists from './playlists';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    genres,
    tracks,
    artists,
    albums,
    audio,
    profile,
    theme,
    playlists,
    routing: routerReducer
});

export default rootReducer;
