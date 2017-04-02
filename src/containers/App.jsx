import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { themeEnum, themes } from '../constants/material-ui-theme'
import Audio from '../components/Audio'
import Header from "../components/Header"
import FloatingControls from '../components/FloatingControls'
import * as AudioActions from '../actions/AudioActions'
import * as ProfileActions from '../actions/ProfileActions'
import clone from 'lodash/clone';

@connect(
  state => ({audio: state.audio, theme: state.theme, profile: state.profile}),
  dispatch => bindActionCreators({...AudioActions, ...ProfileActions}, dispatch)
)

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         autoPlay: false
      }
   }


  componentDidMount() {
    // Initialize DOM Audio and retrieve
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.audio.volume);
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
    this.props.retrieveSongs(this.props.isShuffling);

    // Get current user if not in store
    if (!this.props.profile.currentUser.avatar) {
      this.props.getCurrentUser(window.sessionStorage.getItem('currentUser'));
   }
  }


  handleProgress = () => { this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));}
  handleTimeUpdate = () => { this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));}
  handleError = (e) => { this.props.setError(ReactDOM.findDOMNode(this.refs.audio));}
  handleVolumeChange = (volume) => { this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), volume);}
  handleToggleFavorite = () => { this.props.toggleFavorite();}
  handleToggleRepeat = () => { this.props.toggleRepeat();}
  handleToggleShuffle = () => { this.props.toggleShuffle();}
  handleTrackClick = (percent) => { this.props.updatePosition(ReactDOM.findDOMNode(this.refs.audio), percent);}
  handleToggleLoop = () => { this.props.toggleLoop(ReactDOM.findDOMNode(this.refs.audio));}

  handlePlay = () => {
    console.info("Handling Play request");
    this.props.play(ReactDOM.findDOMNode(this.refs.audio));
    this.setState({autoPlay: true});
  }

  handleNext = () => {
    console.info("Handling Next request");
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    if (!this.props.audio.isRepeating) { this.props.next(audio);}
  }

  handlePrevious = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.previous(audio);
    this.props.play(audio);
  }

  handleEnd = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.next(audio);
    this.props.updateQueue(audio)
  }

  handleLoadedData = () => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    if (this.props.audio.isRepeating) { this.props.play(audio);}
  }

  pushToQueue = (songs) => {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.addToQueue(songs)
    console.log('IN ADD TO QUEUE', songs)
  }

  render() {
      const {
        volume, isPlaying, percent, isFavorite, progress, error,
        duration, isRepeating, currentlyPlaying, autoPlay, isLooping,
        isShuffling
      } = this.props.audio;

      let song = currentlyPlaying;
      if (song == null) {
         song = this.props.audio.defaultSong;
      }
      // console.info(song);

      let queue = this.props.audio.upcoming.map(clone);
      queue.unshift(currentlyPlaying);

     const currentPage = this.props.routes[this.props.routes.length-1].path
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
     }

     return (
        <MuiThemeProvider muiTheme={getMuiTheme(this.props.theme.currentTheme)}>
          <div style={{
               width:'100%',
               height:'100%',
               background: this.props.theme.currentTheme.palette.canvasColor + ' repeat top center fixed',
               backgroundSize:'cover',
               position:'fixed'
             }} >
            <Audio
              ref="audio"
              autoPlay={this.state.autoPlay}
              src={song ? song.url : ""}
              onProgress={this.handleProgress}
              onTimeUpdate={this.handleTimeUpdate}
              onError={this.handleError}
              onEnded={this.handleEnd}
              onLoadedData={this.handleLoadedData}
              // onCanPlay={this.handlePlay}
            />
            <Header
              {...audioProps}
              currentUser={this.props.profile.currentUser}
              currentPage={currentPage ?  (" / " + this.props.routes[this.props.routes.length-1].path) : ""}
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
