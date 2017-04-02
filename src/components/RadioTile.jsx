import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import * as TrackActions from '../actions/TrackActions'
// import * as AlbumActions from '../actions/AlbumActions'
// import * as ArtistActions from '../actions/ArtistActions'
import { IconButton, IconMenu, MenuItem, Divider, Paper } from 'material-ui'
import { CardTitle } from 'material-ui/Card'

const styles = {
  root: {
    width:'100%',
    height:'inherit'
  },
  overlay: {
    width:'100%',
    height:'inherit',
    backgroundColor:  'rgba(0, 0, 0, 0.6)',
    left:0,
    bottom:0,
    right:0,
    lineHeight:1.3,
    textShadow:'1px 1px black',
    topActions: {
        top:0,
        height:'50%',
        width:'100%'
    },
    bottomActions: {
        height:'50%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        bottom:0,
        button: {
          marginTop:'auto',
          float:'right',
          top:-24
        },
        label: {
          marginTop:'auto',
          maxWidth:'85%',
          left:0,
          bottom:0,
          title: {
           bottom:0,
           left:15,
           right:0,
           width:'100%',
           textShadow:'1px 1px black',
           whiteSpace:'no-wrap'
          },
          subtitle: {
            bottom:0,
            left:15,
            right:0,
            width:'100%',
            textOverflow:'clip',
            textShadow:'1px 1px black',
            whiteSpace:'no-wrap'
          }
        }
    }
  }
}
class RadioTile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hover:false
      }
   }
   handleHover = () => {this.setState({hover: true})}
   handleLeave = () => {this.setState({hover: false})}

   renderOverlay () {
      const { title, subtitle} = this.props;
      if (this.state.hover) {
       return (
         <div
           id="overlay_container"
           style={styles.overlay}
         ><div style={styles.overlay.topActions}>
           <IconButton
             hoveredStyle={{color:'green'}}
             iconClassName="material-icons"
             iconStyle={this.props.liked ? {backgroundColor:'green', borderRadius:'50%'} : {}}

           >{"check"}</IconButton>
           <IconButton
             hoveredStyle={{color:'red'}}
             iconClassName="material-icons"
             iconStyle={this.props.disliked ? {backgroundColor:'red', borderRadius:'50%'} : {}}
             style={{float:'right'}}
           >{"close"}</IconButton>
         </div>
           <div style={styles.overlay.bottomActions}>
             <CardTitle
               style={styles.overlay.bottomActions.label}
               subtitle={subtitle}
               subtitleStyle={styles.overlay.bottomActions.label.subtitle}
               title={title}
               titleStyle={styles.overlay.bottomActions.label.title}
             />
             {/* <IconButton
               iconClassName="material-icons"
               style={styles.overlay.bottomActions.button}
             >more_vert</IconButton> */}
             <IconMenu
               anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
               iconButtonElement={
                 <IconButton iconClassName="material-icons">{"more_vert"}</IconButton>
               }
               style={styles.overlay.bottomActions.button}
               targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
             ><MenuItem primaryText="Start radio" />
               <MenuItem primaryText="Play next" />
               <Divider />
               <MenuItem primaryText="Add to queue" />
               <MenuItem primaryText="Add to playlist" />
               <Divider />
               <MenuItem primaryText="Artist info" />
               <MenuItem primaryText="Album info" />
             </IconMenu>
           </div>
         </div>
       );
     }
    }
   render()  {
     const { imgURL, className } = this.props;
     return (
       <Paper
         onMouseLeave={this.handleLeave}
         onMouseOver={this.handleHover}
         style={{
           height:'100%',
           width:'100%',
           maxHeight: 'calc(100vh - 144px)',
           maxWidth:'calc(100vh - 144px)',
           padding:0,
           background: 'url('+ imgURL + ') ',
           backgroundSize: 'cover',
           backgroundPosition:'center center'
         }}
         zDepth={3}
       ><div
         className={className}
         style={{height:'100%', width:'100%', borderRadius:.1}}
        >{this.renderOverlay()}</div>
       </Paper>

    );
 }
}
RadioTile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   tracks:   PropTypes.object.isRequired,
   albums:   PropTypes.object.isRequired,
   artists:  PropTypes.object.isRequired
}

function mapStateToProps(state) {
   const { tracks, albums, artists} = state
   return { tracks, albums, artists };
}

export default connect(mapStateToProps)(RadioTile);
