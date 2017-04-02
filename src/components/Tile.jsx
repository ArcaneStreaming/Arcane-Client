import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TrackActions from '../actions/TrackActions'
import * as AlbumActions from '../actions/AlbumActions'
import * as ArtistActions from '../actions/ArtistActions'
import { RaisedButton } from 'material-ui'
import ListDialog from './ListDialog'

const styles = {
   button: {
     width:'100%',
     height:'inherit',
    //  height:'100%',
    //  minHeight:'calc(100vh/4)',
     bottom:0,
     label: {
       width:'inherit',
       height:'100%',
       backgroundColor:  'rgba(0, 0, 0, 0.6)',
       left:0,
       bottom:0,
       right:0,
       position:'absolute',
       lineHeight:1.3,
       textOverflow:'clip',
       textShadow:'1px 1px black',
       overflow:'hidden',
       labelText:{
        //  top:'35%',
        //  bottom:'35%',
        height:'100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
         left:0,
         right:0,
         padding:4,
         position:'absolute'
       }
     }
   },
   href: {
     color:'white',
     fontSize:'1.4rem',
     display:'block',
     maxHeight:'50%',
     overflow:'hidden',
     whiteSpace:'no-wrap'
   },
   hrefsub: {
     color:'gray',
     fontSize:'1.2rem',
     display:'block',
     textOverflow:'clip',
     maxHeight:'50%',
     overflow:'hidden',
     whiteSpace:'no-wrap'
   }
}


class Tile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false,
         hover:false
      }
   }
   handleHover = () => {this.setState({hover: true})}
   handleLeave = () => {this.setState({hover: false})}
   handleExpand = () => {
     const { dispatch, type} = this.props;
     if (type === "album") {dispatch(TrackActions.getAlbumTracks(this.props.id))}
     if (type === "artist") {dispatch(AlbumActions.getArtistAlbums(this.props.id))}
     if (type === "genre") {dispatch(ArtistActions.getGenreArtists(this.props.id))}
     this.setState({expanded: true});};

   handleClose = () => {this.setState({expanded: false});}
   render()  {
     const { title, subtitle, imgURL } = this.props;
     return (
       <RaisedButton
         backgroundColor={'transparent'}
         buttonStyle={{padding:0,
           background: 'url('+ imgURL + ') ',
           backgroundSize: 'cover',
           backgroundPosition:'center center'
         }}
         fullWidth
         label={
           <div style={styles.button.label.labelText}>
             <a style={styles.href}>{title}</a>
             <a style={styles.hrefsub}>{subtitle}</a></div>}
         labelStyle={this.state.hover ? styles.button.label : {display:'none'}}
         onClick={this.handleExpand}
         onMouseLeave={this.handleLeave}
         onMouseOver={this.handleHover}
         style={styles.button}
         //  style={{
         //
         //    width:'100%',
         //    height:'100%',
         //     // minHeight:'calc(100vw/8)',
         //     // maxHeight:'calc(100vw/4)',
         //    //  maxHeight:'calc(100vw/4)',
         //    bottom:0
         //  }}
       >
         <ListDialog
           {...this.props}
           onRequestClose={this.handleClose}
           open={this.state.expanded}
         />
       </RaisedButton>

    );
 }
}
Tile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks:   PropTypes.object.isRequired,
   albums:   PropTypes.object.isRequired,
   artists:  PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { tracks, albums, artists} = state
   return { tracks, albums, artists };
}

export default connect(mapStateToProps)(Tile);
