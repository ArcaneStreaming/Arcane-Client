import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// import AlbumCarousel from '../components/AlbumCarousel'
import * as GenreActions from '../actions/GenreActions'
// import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'
import BrowseCarousel from '../components/BrowseCarousel'
class BrowsePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        selected: [],
        snackOpen:false,
        snackMessage: 'Added nada!'
      };
      const { dispatch } = this.props;
      // dispatch(TrackActions.getTracks());
      dispatch(AlbumActions.getAlbums());
      dispatch(ArtistActions.getArtists());
      dispatch(GenreActions.getGenres());
   }
   addToSelected(items) {
     this.setState({
       selected: items
     });
   }
   render() {
      const { genres, artists, albums } = this.props;
      return (
        <div style={{
          height:'calc(100vh - 64px)',
          overflowY:'auto',
          width:'100vw',
          padding:10
        }}
        >
          <BrowseCarousel
            {...this.props}
            label={"New Releases"}
            list={albums.allAlbums}
            select={this.addToSelected.bind(this)}
            selectedTracks={this.state.selected}
            type={'album'}
          />
          <BrowseCarousel
            {...this.props}
            label={"Genres"}
            list={genres}
            select={this.addToSelected.bind(this)}
            selectedTracks={this.state.selected}
            type={'genre'}
          />
          <BrowseCarousel
            {...this.props}
            label={"Artists"}
            list={artists.allArtists}
            select={this.addToSelected.bind(this)}
            selectedTracks={this.state.selected}
            type={'artist'}
          />
          <BrowseCarousel
            {...this.props}
            label={"Albums"}
            list={albums.allAlbums}
            select={this.addToSelected.bind(this)}
            selectedTracks={this.state.selected}
            type={'album'}
          />
        </div>
      );
   }
}

BrowsePage.propTypes = {
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

export default connect(mapStateToProps)(BrowsePage);
