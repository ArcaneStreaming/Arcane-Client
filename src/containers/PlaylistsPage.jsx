import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Paper, Menu, MenuItem,
   RaisedButton, FontIcon, Avatar,
   Divider, ListItem, TextField } from 'material-ui'
import theme from '../constants/material-ui-theme'

import TrackMenu from '../components/TrackMenu'
import PlaylistMenu from '../components/PlaylistMenu'
import { host } from '../constants/host'

import * as PlaylistActions from '../actions/PlaylistActions'

const styles = {
   paper: {
      backgroundColor: theme.palette.primary3Color
   },
   container: {
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100vh - 60px)',
      position: 'relative',
      float: 'left',
   },
   playlistContainer: {
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100vh - 60px)',
      position: 'relative',
      float: 'left',
      width: '25vw'
   }
}

class PlaylistsPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      }
      const { dispatch } = this.props;
      dispatch(PlaylistActions.getUserPlaylists(this.props.params.id));

      this.state = {
         selectedPlaylist: -1,
         newPlaylistName: '',
         textVisible: false
      }
   }

   handleClose = () => {this.setState({expanded: false});}

   handleNewPlaylist = () => {
      this.setState({textVisible: true});
   }

   handleNewPlaylistNameChange = (e) => {
      this.setState({newPlaylistName: e.target.value});
   }

   handleNewPlaylistNameKeyPress = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         this.createNewPlaylist();
      }
   }

   createNewPlaylist = () => {
      console.info("Creating an new playlist...");
      this.props.dispatch(PlaylistActions.createNewPlaylist(this.state.newPlaylistName, this.props.profile.currentUser.id));
      this.setState({textVisible: false, newPlaylistName: ''});
   }

   handlePlaylistSelect = (e, item, index) => {
      const { dispatch, playlists } = this.props;
      this.setState({selectedPlaylist: index});
      dispatch(PlaylistActions.getPlaylistTracks(playlists.playlists[index].id));
   }

   renderNewPlaylistActions() {
      if (this.state.textVisible) {
         return (
            <div style={{width: '90%', margin: 'auto'}}>
               <TextField
                  id={'new_playlist_name'}
                  name={'new_playlist_name'}
                  value={this.state.newPlaylistName}
                  style={this.state.textVisible ? {visibility: 'visible'} : { visibility: 'hidden'}}
                  onKeyPress={this.handleNewPlaylistNameKeyPress}
                  onChange={this.handleNewPlaylistNameChange}
                  fullWidth
                  hintText={'New Playlist'}
                  type={'text'}
                  />
               <div style={{textAlign: 'center'}}>
                  <RaisedButton
                     primary={true}
                     icon={<FontIcon className="material-icons">create_new_folder</FontIcon>}
                     onTouchTap={this.handleNewPlaylist}
                     />
               </div>
            </div>
         );
      } else {
         return (
            <div style={{width: '90%', margin: 'auto'}}>
               <div style={{textAlign: 'center'}}>
                  <RaisedButton
                     primary={true}
                     icon={<FontIcon className="material-icons">create_new_folder</FontIcon>}
                     onTouchTap={this.handleNewPlaylist}
                     />
               </div>
            </div>
         )
      }
   }

   renderPlaylists(list) {
      let arr = list.map((item) => (
         <MenuItem
            animation={null}
            key={"playlist_" + item.id}
            innerDivStyle={{padding:0, width:'100%'}}
            >
            <ListItem
               key={"playlit_data_" + item.id}
               primaryText={item.name}
               secondaryText={item.tracks.length + " songs"}
               innerDivStyle={{whiteSpace:'pre-line'}}
               rightIconButton={
                  <PlaylistMenu
                     {...this.props}
                     id={item.id}
                     name={item.name}
                     playlist={item}
                     />
               }
               />
         </MenuItem>
      ));
      return arr;
   }

   // TODO refactor TrackCollection to work here. Duplicate code.
   renderArt(track) {
      const {noArt} = this.props;
      if (!noArt && track) {
         return (
            <Avatar
               src={track.album.artwork ? track.album.artwork : host + 'static/images/default-artwork.png'}
               style={{borderRadius:1}}
               />
         );
      }
      if (noArt && track) {
         return (
            <Avatar style={{backgroundColor:'transparent', color:theme.palette.textColor}}>{track.order}</Avatar>
         );
      }
   }

   // TODO refactor TrackCollection to work here. Duplicate code.
   renderTracksListItems(tracks) {
      // ListItem.defaultProps.disableTouchRipple=true;
      if (tracks) {
         let arr = tracks.map((track) => (
            <MenuItem
               animation={null}
               id={'tracks_collection_menu_item'+track.id}
               innerDivStyle={{padding:0, width:'100%'}}
               key={'track_list_item_'+ track.id}
               value={track}
               >
               <Divider />
               <ListItem
                  // style={{position:'relative', marginLeft:'.5%', marginRight:'2%'}}
                  disabled
                  id={'tracks_collection_menu_item_list_item'+track.id}
                  innerDivStyle={{whiteSpace:'pre-line'}}
                  leftAvatar={this.renderArt(track)}
                  primaryText={track.name}
                  rightIconButton={
                  <TrackMenu
                     {...this.props}
                     id={track.id}
                     name={track.name}
                     />}
                     secondaryText={track.artist.name + ' - ' + track.duration}
                  />
            </MenuItem>
         ))
         return arr;
      }
   }

   renderPlaylistContents() {
      return this.renderTracksListItems(this.props.playlists.tracks)
   }

   render() {
      return (
         <div>
            <Paper style={styles.paper}>
               <div style={{width: '100%'}}>
                  <div style={styles.playlistContainer}>
                     <Menu
                        onItemTouchTap={this.handlePlaylistSelect}
                        disableAutoFocus
                        autoWidth={false}
                        width={'25vw'}
                        >
                        { this.renderPlaylists(this.props.playlists.playlists) }
                     </Menu>
                     { this.renderNewPlaylistActions() }
                  </div>
                  <div style={styles.container}>
                     <div style={{width: '70vw', marginLeft: '5vw'}}>
                        { this.renderPlaylistContents() }
                     </div>
                  </div>
               </div>
            </Paper>
         </div>
      );
   }
}

PlaylistsPage.propTypes = {
   dispatch: PropTypes.func.isRequired,
   playlists: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { playlists, profile } = state;
   return { playlists, profile };
}

export default connect(mapStateToProps)(PlaylistsPage);
