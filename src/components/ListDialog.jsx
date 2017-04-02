import React, { Component } from 'react'
import { Dialog, FloatingActionButton, FontIcon } from 'material-ui'
import{ CardTitle } from 'material-ui/Card'
import TracksCollection  from './TracksCollection'
import AlbumsCollection  from './AlbumsCollection'
import ArtistsCollection  from './ArtistsCollection'

const styles = {
   fab: {
    bottom:10,
    right:15,
    position:'absolute',
    zIndex:1
   },
   cardTitleRoot: {
    padding:0,
    margin:0,
    paddingTop:160
   },
   title: {
    bottom:25,
    whiteSpace:'no-wrap',
    overflow:'hidden',
    textOverflow:'clip',
    left:15,
    position:'absolute',
    textShadow:'1px 1px black'
   },
   subtitle: {
     bottom:0,
     whiteSpace:'no-wrap',
     overflow:'hidden',
     textOverflow:'clip',
     left:15,
     position:'absolute',
     textShadow:'1px 1px black'
   }
}

export default class ListDialog extends Component {
   constructor(props) {
      super(props);
   }
   shouldComponentUpdate () {
        return true;
    }

   renderDialogTitle(title, subtitle) {
     return (
       <CardTitle
         style={styles.cardTitleRoot}
         subtitle={subtitle}
         subtitleStyle={styles.subtitle}
         title={title}
         titleStyle={styles.title}
       >
         <FloatingActionButton style={styles.fab}>
           <FontIcon className="material-icons">{"play_arrow"}</FontIcon>
         </FloatingActionButton>
       </CardTitle>
     );
   }
   renderContent() {
     const {type, tracks, albums, artists} = this.props;
     if (type === "album") {
       return (
         <TracksCollection
           {...this.props}
           noArt
           tracks={tracks.albumTracks}
         />
       );
     }
    if (type === "artist") {
      return (
        <AlbumsCollection
          {...this.props}
          albums={albums.artistAlbums}
          cols={4}
        />
      );
    }
    if (type === "genre") {
      return (
        <ArtistsCollection
          {...this.props}
          artists={artists.genreArtists}
          cols={4}
        />
      );
    }
   }
   render() {
     const {tracks, albums, genres, title, subtitle, imgURL} = this.props;
     if(tracks || albums || genres) {
      return (
        <Dialog
          {...this.props}
          autoDetectWindowHeight
          autoScrollBodyContent
          bodyStyle={{padding:0,margin:0, width:'100%', overflowX:'hidden'}}
          title={this.renderDialogTitle(title, subtitle)}
          titleStyle={{padding:0,background: 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('+ imgURL + ') ',
             backgroundSize: 'cover',
             backgroundPosition:'center center',
             overflow:'hidden',
             textShadow:'1px 1px black'
             //  height:250,
          }}
          //  actions={<FlatButton
          //  label="Cancel"
          //  primary={true}
          //  onTouchTap={onClose}/>}
        > <div> {this.renderContent()}</div>

        </Dialog>
      );
   }
 }
}
