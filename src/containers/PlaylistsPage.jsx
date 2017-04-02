import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Paper, List, ListItem } from 'material-ui'
import theme from '../constants/material-ui-theme'

import * as PlaylistActions from '../actions/PlaylistActions'

const styles = {
   paper: {
      backgroundColor: theme.palette.primary3Color
   },
}

class PlaylistsPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      }
      const { dispatch } = this.props;
      dispatch(PlaylistActions.getUserPlaylists(this.props.params.id));
   }

   handleClose = () => {this.setState({expanded: false});}

   renderPlaylists(lists) {
      let arr = lists.map((list) => (
         <ListItem key={"playlist_" + list.id}
            primaryText={list.name}
            secondaryText={list.tracks.length + " songs"} />
      ))
      return arr;
   }

   render() {
      return (
         <div>
            <Paper style={styles.paper}>
               <h3>Playlists Page</h3>
               <List>
                  {this.renderPlaylists(this.props.playlists.playlists)}
               </List>
            </Paper>
         </div>
      );
   }
}

PlaylistsPage.propTypes = {
   dispatch: PropTypes.func.isRequired,
   playlists: PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { playlists } = state;
   return { playlists };
}

export default connect(mapStateToProps)(PlaylistsPage);
