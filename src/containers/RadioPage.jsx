import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Radio from '../components/Radio'
import RadioChoices from '../components/RadioChoices'
import * as TrackActions from '../actions/TrackActions'

const styles = {
   scrollable: {
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
      overflowX: 'visible',
      width: '100%',
      padding: 10
   }
}

class RadioPage extends Component {
   constructor(props) {
      super(props);
      const { dispatch } = this.props;
      dispatch(TrackActions.getTracks());
   }

   render() {
      return (
         <div style={styles.scrollable}>
            <Radio
               isPlaying={this.props.audio.isPlaying}
               tracks={this.props.audio}
               />
            <RadioChoices
               {...this.props}
               />
         </div>
      );
    }
}
RadioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tracks: PropTypes.object.isRequired,
  audio: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { tracks, audio, genres } = state

  return {
     tracks, audio, genres
  }
}

export default connect(mapStateToProps)(RadioPage);
