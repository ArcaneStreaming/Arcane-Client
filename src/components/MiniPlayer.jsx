import React, { Component } from 'react'
import {Slider, IconButton, List, ListItem, Divider, Avatar} from 'material-ui'
import {Card, CardMedia, CardTitle} from 'material-ui/Card'
import { DefaultControl, IconChangeControl, ColoredControl } from './PlaybackControls'
import { fade } from 'material-ui/utils/colorManipulator'
import theme from '../constants/material-ui-theme'

const url = "http://localhost:8000/";

const style ={
  container: {
    height:280,
    width:280,
    position:'relative',
    top:0,
    right:0,
    zIndex:1
  },
  titleContainer: {
    padding:0,
    top:0,
    position:'absolute',
    width:'100%'
  },
  title: {
    textAlign:'center',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'clip'
  },
  controlContainer: {
    width:'100%',
    position:'absolute',
    bottom:0,
    textAlign:'center'
  },
  slider: {
      margin:'0',
      padding:'0'
  },
  buttons: {
    textAlign:'center'
  },
  playerArt: {
    flex: 1,
    height:280
  },
  queueArt: {
    borderRadius:1
  },
  queue: {
    paddingTop:0,
    position:'absolute',
    top:280,
    maxWidth:280,
    bottom:0,
    overflowY:'auto'
  }
}

export default class MiniPlayer extends Component {

  constructor(props){
    super(props);
    this.state = {
      controlList: [
         { "icon": "repeat", "tooltip": "repeat", "onClick": this.props.onToggleRepeat },
         { "icon": "skip_previous", "tooltip": "previous", "onClick": this.props.onPrevious },
         { "icon": "play_arrow", "tooltip": "play/pause", "onClick": this.props.onPlay },
         { "icon": "skip_next", "tooltip": "next", "onClick": this.props.onNext },
         { "icon": "shuffle", "tooltip": "shuffle", "onClick":this.props.onToggleShuffle }
         ]
      }
  }

  componentWillReceiveProps() {
     const { onToggleRepeat, onPrevious, onPlay, onNext, onToggleShuffle } = this.props;
     let newControlList = this.state.controlList;
     newControlList[0].onClick = onToggleRepeat;
     newControlList[1].onClick = onPrevious;
     newControlList[2].onClick = onPlay;
     newControlList[3].onClick = onNext;
     newControlList[4].onClick = onToggleShuffle;
     this.setState({ controlList: newControlList });
  }

  handleSlideClick = (event, value) => {
    //  console.info("Value in handle slide:", value);
     this.props.onSetTime(value);
  }

  getNowPlayingSong() {
    const { queue } = this.props;
    return queue.length > 0 ? queue[0] : null
  }

  renderPlaybackButtons() {
    return (
      <div>
        <ColoredControl
          flag={this.props.isLooping}
          icon="repeat"
          onClick={this.props.onToggleLoop}
        />
        <DefaultControl
          icon="skip_previous"
          onClick={this.props.onPrevious}
        />
        <IconChangeControl
          flag={this.props.isPlaying}
          icon1="play_arrow"
          icon2="pause"
          onClick={this.props.onPlay}
        />
        <DefaultControl
          icon="skip_next"
          onClick={this.props.onNext}
        />
        <ColoredControl
          flag={this.props.isShuffling}
          icon="shuffle"
          onClick={this.props.onToggleShuffle}
        />
      </div>
      );
  }

  renderPlaybackControls() {
    return(
      <div style={style.controlContainer}>
        <Slider
          defaultValue={0}
          max={1}
          onChange={this.handleSlideClick}
          sliderStyle={style.slider}
          value={this.props.percent}
        />
        {this.renderPlaybackButtons()}
      </div>
    );
  }

  renderEQIcon(track) {
    return(
      track && track.id === this.getNowPlayingSong().id
      ? <IconButton
        iconClassName="material-icons"
        iconStyle={{color: theme.palette.alternateTextColor}}
        >
        {"equalizer"}</IconButton>
      : <IconButton
        iconClassName="material-icons"
        >
        {"play_arrow"}</IconButton>);
  }

  renderQueueList() {
    const {queue} = this.props;
   //  console.info(queue);
      let q = queue.map((track) => (
        <div
          id={'miniplayer_queue_track_' + (track == null ? '-1' : track.id)}
          key={'miniplayer_queue_track_' + (track == null ? '-1' : track.id)}
        >
          <Divider />
          <ListItem
            hoverColor={fade(theme.palette.accent1Color, 0.3)}
            leftAvatar={
              <Avatar
                src={track && track.album.artwork ? track.album.artwork : url+'static/images/default-artwork.png'}
                style={style.queueArt}
              />}
            primaryText={track ? track.name : "No Name"}
            rightIconButton={this.renderEQIcon(track)}
            secondaryText={track && track.artist ? track.artist.name : "No Artist Name"}
          />
        </div>
    ))
    return (<List style={style.queue}>{q}</List>);
  }

  renderOverlay () {
    let cur_song = this.getNowPlayingSong();
      return (
        <div
          id="player_overlay_container"
          style={style.container}
        >
          <CardTitle
            id="player_overlay_title"
            style={style.titleContainer}
            subtitle={cur_song.artist.name ? cur_song.artist.name : null}
            subtitleStyle={style.title}
            title={cur_song.name ? cur_song.name : null}
            titleStyle={style.title}
          />
          {this.renderPlaybackControls()}
        </div>
      );
  }

  renderNowPlaying() {
    let cur_song = this.getNowPlayingSong();
    return (
      <Card >
        <CardMedia overlay={cur_song ? this.renderOverlay() : null}>
          <img
            src={cur_song ? cur_song.album.artwork : url+'static/images/default-artwork.png'}
            style={style.playerArt}
          />
        </CardMedia>
      </Card>
    );
  }

  render() {
    return (
      <div >
        {this.renderNowPlaying()}
        {this.renderQueueList()}
      </div>
    );
  }
}
