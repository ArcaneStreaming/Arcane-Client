import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../components/Header';
import FloatingControls from '../components/FloatingControls';
import * as AudioActions from '../actions/AudioActions';
import * as ProfileActions from '../actions/ProfileActions';
import * as PlaylistActions from '../actions/PlaylistActions';
import * as TrackActions from '../actions/TrackActions';
import * as GenreActions from '../actions/GenreActions';
import * as AlbumActions from '../actions/AlbumActions';
import * as ArtistActions from '../actions/ArtistActions';
import clone from 'lodash/clone';

@connect(
	state => ({ audio: state.audio, theme: state.theme, profile: state.profile }),
	dispatch => bindActionCreators({
		...AudioActions, ...ProfileActions, ...PlaylistActions,
		...GenreActions, ...AlbumActions, ...ArtistActions, ...TrackActions,
	}, dispatch)
)

export default class App extends Component {
	static propTypes = {
		updateVolume: PropTypes.func.isRequired,
		updatePosition: PropTypes.func.isRequired,
		// updateQueue: PropTypes.func.isRequired,
		setAudio: PropTypes.func.isRequired,
		setProgress: PropTypes.func.isRequired,
		setTime: PropTypes.func.isRequired,
		setError: PropTypes.func.isRequired,
		retrieveSongs: PropTypes.func.isRequired,
		toggleFavorite: PropTypes.func.isRequired,
		toggleRepeat: PropTypes.func.isRequired,
		toggleLoop: PropTypes.func.isRequired,
		toggleShuffle: PropTypes.func.isRequired,
		play: PropTypes.func.isRequired,
		pause: PropTypes.func.isRequired,
		next: PropTypes.func.isRequired,
		previous: PropTypes.func.isRequired,
		audio: PropTypes.object.isRequired,

		getCurrentUser: PropTypes.func.isRequired,
		getUserPlaylists: PropTypes.func.isRequired,
		getAlbums: PropTypes.func.isRequired,
		getArtists: PropTypes.func.isRequired,
		getGenres: PropTypes.func.isRequired,
		addToQueue: PropTypes.func.isRequired,
		isShuffling: PropTypes.bool,
		profile: PropTypes.object,
		theme: PropTypes.object,
		children: PropTypes.object,
	}

	constructor(props) {
		super(props);
		this.state = {
			autoPlay: false,
		};

		props.getAlbums();
		props.getArtists();
		props.getGenres();
	}


	componentDidMount() {
		const { profile } = this.props;
		// Initialize DOM Audio and retrieve
		this.props.setAudio(this.audio.audioEl);
		this.props.updateVolume(this.props.audio.volume);
		this.props.setProgress();
		this.props.setTime();
		this.props.retrieveSongs(this.props.isShuffling);

		// Get current user if not in store
		if (!profile.currentUser.id) {
			this.props.getCurrentUser(window.sessionStorage.getItem('currentUser'));
			this.props.getUserPlaylists(window.sessionStorage.getItem('currentUser'));
		}
	}


	handleProgress = () => { this.props.setProgress(); }
	handleTimeUpdate = () => { this.props.setTime(); }
	handleError = () => { this.props.setError(); }
	handleVolumeChange = (volume) => { this.props.updateVolume(this.audio, volume); }
	handleToggleFavorite = () => { this.props.toggleFavorite(); }
	handleToggleRepeat = () => { this.props.toggleRepeat(); }
	handleToggleShuffle = () => { this.props.toggleShuffle(); }
	handleTrackClick = (percent) => { this.props.updatePosition(percent); }
	handleToggleLoop = () => { this.props.toggleLoop(); }

	handlePlay = () => {
		this.props.play();
		this.setState({ autoPlay: true });
	}

	handleNext = () => {
		if (!this.props.audio.isRepeating) {
			this.props.next();
		}
	}

	handlePrevious = () => {
		this.props.previous();
		this.props.play();
	}

	handleEnd = () => {
		this.props.next();
		// this.props.updateQueue();
	}

	handleLoadedData = () => {
		if (this.props.audio.isRepeating) {
			this.props.play();
		}
	}

	pushToQueue = (songs) => {
		this.props.addToQueue(songs);
	}

	render() {
		const {
			isPlaying, percent,
			currentlyPlaying, isLooping,
			isShuffling,
		} = this.props.audio;

		let song = currentlyPlaying;
		if (song == null) {
			song = this.props.audio.defaultSong;
		}

		let queue = this.props.audio.upcoming.map(clone);
		queue.unshift(currentlyPlaying);

		let audioProps = {
			onNext: this.handleNext,
			onPlay: this.handlePlay,
			onPrevious: this.handlePrevious,
			onToggleShuffle: this.handleToggleShuffle,
			onToggleLoop: this.handleToggleLoop,
			onSetTime: this.handleTrackClick,
			percent: percent,
			isPlaying: isPlaying,
			isShuffling: isShuffling,
			isLooping: isLooping,
			currentlyPlaying: currentlyPlaying,
			queue: queue,
		};

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(this.props.theme.currentTheme)}>
				<div
					style={{
						width:'100%',
						height:'100%',
						background: this.props.theme.currentTheme.palette.canvasColor + ' repeat top center fixed',
						backgroundSize:'cover',
						position:'fixed',
					}}
					>
					<ReactAudioPlayer
						ref={(audio) => { this.audio = audio; }}
						autoPlay={this.state.autoPlay}
						src={song ? song.url : ''}
						onProgress={this.handleProgress}
						onListen={this.handleTimeUpdate}
						onError={this.handleError}
						onEnded={this.handleEnd}
						/>
					<Header
						{...audioProps}
						currentUser={this.props.profile.currentUser}
						/>

					{this.props.children}

					<FloatingControls
						{...audioProps}
						/>
				</div>
			</MuiThemeProvider>
		);
	}
}
