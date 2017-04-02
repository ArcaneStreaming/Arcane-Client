import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// import SwipeableViews from 'react-swipeable-views';
import GenresCollection from './GenresCollection'
import TracksCollection from './TracksCollection'
import AlbumsCollection from './AlbumsCollection'
import ArtistsCollection from './ArtistsCollection'
import * as GenreActions from '../actions/GenreActions'
import * as TrackActions from '../actions/TrackActions'
import * as ArtistActions from '../actions/ArtistActions'
import * as AlbumActions from '../actions/AlbumActions'

const styles = {
  root: {
    margin:'auto',
    maxHeight:'85vh',
    maxWidth:'80vw',
    marginTop:10
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 0,
    height:'calc(100vh - 114px)',
    maxWidth:'100vw'
  }
};
export default class CollectionTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 2,
      renderCount: false
    };
    const { dispatch } = this.props;
    dispatch(TrackActions.getTracks());
    dispatch(AlbumActions.getAlbums());
    dispatch(ArtistActions.getArtists());
    dispatch(GenreActions.getGenres());

  }
  handleChange = (value) => { this.setState({ slideIndex: value });};

  renderCount(countIndex) {
    const {genres,artists,albums,tracks} = this.props;
    let counts = [
      genres.count > 0 ? '['+genres.count+']' : '',
      artists.count > 0 ? '['+artists.count+']' : '',
      albums.count > 0 ? '['+albums.count+']' : '',
      tracks.count > 0 ? '['+tracks.count+']' : ''
    ];
    return this.state.renderCount ? counts[countIndex] : '';
  }

  renderTabs() {
    let contents = [
      {index: 0, label: "Genres " + this.renderCount(0)},
      {index: 1, label: "Artists " + this.renderCount(1)},
      {index: 2, label: "Albums " + this.renderCount(2)},
      {index: 3, label: "Songs " + this.renderCount(3)}
  ];
  let tabs = contents.map((tab) => (
    <Tab
      key={tab.index}
      label={tab.label}
      value={tab.index}
    />
  ))
  return tabs;
  }
  renderSlide(index) {
    const {tracks, artists, albums, genres} = this.props;
    let contents = [
      <GenresCollection
        {...this.props}
        cols={8}
        genres={genres}
        key={'collection_tabs_slide_guts'+index}
      />,
      <ArtistsCollection
        {...this.props}
        artists={artists.allArtists}
        cols={8}
        key={'collection_tabs_slide_guts'+index}
      />,
      <AlbumsCollection
        {...this.props}
        albums={albums.allAlbums}
        cols={8}
        key={'collection_tabs_slide_guts'+index}
      />,
      <TracksCollection
        {...this.props}
        key={'collection_tabs_slide_guts'+index}
        tracks={tracks.allTracks}
      />
    ];
    return contents[index];
  }
  renderSlides() {
    let contents = [0,1,2,3];
    let slides = contents.map((slide) => (
      <div
        id={'collection_slide_content_'+slide}
        key={'collection_slide_content_'+slide}
        style={styles.slide}
      >
        {this.renderSlide(slide)}
      </div>
    ))
    return slides;
  }
  render() {
    return (
      <div>
        <Tabs
          id={"collection_tabs_header"}
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          {this.renderTabs()}
        </Tabs>
        <div style={{overflowY:'auto', overflowX:'hidden', height:'calc(100vh - 114px)'}}>
          <div
            id={'collection_slide_content_'+this.state.slideIndex}
            style={styles.slide}
          >
            {this.renderSlide(this.state.slideIndex)}
          </div>
        </div>
        {/* <SwipeableViews
          id={'collection_swipe_views'}
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
          {this.renderSlides()}
        </SwipeableViews> */}
      </div>
    );
  }
}
