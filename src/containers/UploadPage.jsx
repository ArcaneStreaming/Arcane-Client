import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Uploader from '../components/Uploader'
// import * as TrackActions from '../actions/TrackActions'

class Track {
   constructor() {
      this.name = "";
      this.duration = "";
      this.length = 0;
      this.url = null;
      this.artist = null;
      this.album = null;
      this.genre = null;
   }
}


class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [] }
  }

  addTrack(track) {
    console.info(track);
    let newTrack = new Track();
    newTrack.url = track;
  }

  render() {
    return (
       <div>
         <Uploader
           addTrack={this.addTrack.bind(this)}
           dispatch={this.props.dispatch}
         />
       </div>
    );
  }
}

UploadPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks } = state

  return {
     tracks
  }
}

export default connect(mapStateToProps)(UploadPage);
