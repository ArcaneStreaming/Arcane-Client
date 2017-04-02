import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon, Snackbar } from 'material-ui'
import { connect } from 'react-redux'
import CollectionTabs  from '../components/CollectionTabs'
import * as AudioActions from '../actions/AudioActions'

const style = {
  fab: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    marginBottom: '5vh',
    marginLeft: '5vh',
    zIndex:1
  }
}
class MyMusic extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: [], snackOpen:false, snackMessage: 'Added nada!' };
    }

  addToSelected = (items) => {
    this.setState({
      selected: items
    });
  }

  pushToQueue = () => {
    const { dispatch } = this.props;
    // console.log('IN PUSH TO QUEUE', this.state.selected)
    dispatch(AudioActions.addToQueue(this.state.selected));
    this.setState({snackOpen:true, snackMessage:'Added '+this.state.selected.length+' items to the queue',selected:[]})
  }

  handleActionTouchTap = () => { this.setState({ snackOpen: false }); };

  handleRequestClose = () =>  {this.setState({ snackOpen: false }); };

  renderAddQueueButton() {
    if (this.state.selected.length > 0) {
      return(
        <FloatingActionButton
          onClick={this.pushToQueue.bind(this)}
          style={style.fab}
        ><FontIcon className="material-icons">{"queue"}</FontIcon></FloatingActionButton>
      );
    }
  }

  render() {
      return (
        <div>
          <CollectionTabs
            {...this.props}
            select={this.addToSelected}
            selectedTracks={this.state.selected}
          />
          {this.renderAddQueueButton()}
          <Snackbar
            action="undo"
            autoHideDuration={this.state.autoHideDuration}
            message={this.state.snackMessage}
            onActionTouchTap={this.handleActionTouchTap}
            onRequestClose={this.handleRequestClose}
            open={this.state.snackOpen}
          />
        </div>
      );
  }
}

MyMusic.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const {genres, artists, albums, tracks} = state
  return { genres, artists, albums, tracks};
}

export default connect(mapStateToProps)(MyMusic);
