import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Paper, Tabs, Tab, Avatar, FontIcon } from 'material-ui'
import theme from '../constants/material-ui-theme'
import Slider from 'react-slick'

import AlbumsCollection from '../components/AlbumsCollection'
import TracksCollection from '../components/TracksCollection'
import * as ProfileActions from '../actions/ProfileActions'
import * as AlbumActions from '../actions/AlbumActions'
import * as TrackActions from '../actions/TrackActions'

const styles = {
   container: {
      overflowY: 'auto',
      width: '90vw',
      margin: 'auto',
      marginTop: '15',
   },
   paper: {
      backgroundColor: theme.palette.primary3Color
   },
   contents: {
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100vh - 95px)'
   },
   tab: {
      padding: 0,
      maxWidth: '100vw'
   },
   coverPhoto: {
      maxWidth: '50%',
      display: 'inline-block',
      float: 'left',
      padding: '5'
   },
   header: {
      headerInfo: {
      },
      display: 'inline-block',
      width: '100%',
   }
}

class ProfilePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tabIndex: 0
      }
      const { dispatch } = this.props;
      dispatch(ProfileActions.getArtistProfile(this.props.params.id));
      dispatch(ProfileActions.getArtistMembers(this.props.params.id));
      dispatch(ProfileActions.getArtistSummaries(this.props.params.id));
      dispatch(AlbumActions.getArtistAlbums(this.props.params.id));
      dispatch(TrackActions.getArtistTracks(this.props.params.id));
   }

   handleChange = (value) => { this.setState({ tabIndex: value});}

   renderMemberList(members) {
      console.info("IN profilepage RENDERMEMBERLIST",members)
      if (members.length > 0) {
         let arr = members.map((member) => {
            if (member.avatar) {
               return (<div>
                  <Avatar
                     src={member.avatar}
                     size={260}
                     />
                  {member.name}
               </div>);
            } else {
               return (<div>
                  <Avatar
                     icon={<FontIcon className="material-icons">person</FontIcon>}
                     size={160}
                     />
               </div>);
            }
         });
         return arr;
      } else {
         return <div></div>
      }
   }

   renderSummaries(summaries) {
      console.info(summaries);
      let arr = summaries.map((summary) => (
         <p>{summary.summary}</p>
      ))
      return arr;
   }

   renderTab(index) {
      const { albums, tracks, profile } = this.props;
      const tabContents = [
         <div>
            {this.renderSummaries(profile.summaries)}
            <h4>Members</h4>
            <Slider>
               {this.renderMemberList(profile.members)}
            </Slider>
         </div>,
         <AlbumsCollection
            {...this.props}
            cols={8}
            albums={albums.artistAlbums}
            />,
         <TracksCollection
            {...this.props}
            cols={8}
            tracks={tracks.artistTracks}
            />
      ];
      return tabContents[index]
   }

   renderTabs() {
      let contents = [
         {index: 0, label: "Bio"},
         {index: 1, label: "Albums"},
         {index: 2, label: "Tracks"}
      ]
      let tabs = contents.map((tab) => (
         <Tab
            key={tab.index}
            label={tab.label}
            value={tab.index}
            />
      ))
      return tabs;
   }

   render() {
      const { profile} = this.props;
      const { artist, member } = profile;
      return (
         <div style={styles.container}>
            <Paper style={styles.paper}
               autoScrollBodyContent>
               <div style={styles.contents}>
                  <div style={{padding: 0, maxWidth: '100vw'}}>
                     <div id="profile_header" style={styles.header}>
                        <img style={styles.coverPhoto} src={artist.cover_photo}/>
                        <div style={styles.header.headerInfo}>
                           <h3>{artist.name}</h3>
                           <h4>{artist.genre ? artist.genre : "Genre"}</h4>
                           <h4>{artist.location ? artist.location : "Location"}</h4>
                           <h5>Next Event</h5>
                        </div>

                     </div>
                     <Tabs
                        id={"profile_page_tabs"}
                        onChange={this.handleChange}
                        value={this.state.tabIndex}
                     >
                        {this.renderTabs()}
                     </Tabs>
                     <div style={{overflowY: 'auto', overflowX: 'hidden', height:'calc(100vh - 143px)'}}>
                        <div
                           id={'profile_page_tab_' + this.state.tabIndex}
                           style={styles.tab}>
                           {this.renderTab(this.state.tabIndex)}
                        </div>
                     </div>
                  </div>
               </div>
            </Paper>

         </div>
      );
   }

}

ProfilePage.propTypes = {
   dispatch: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { profile, artists, albums, tracks } = state;
   return { profile, artists, albums, tracks };
}

export default connect(mapStateToProps)(ProfilePage);
