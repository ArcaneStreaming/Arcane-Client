import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'
import Waypoint from 'react-waypoint'
import * as AlbumActions from '../actions/ArtistActions'

const url = "http://localhost:8000/";

export default class ArtistsCollection extends Component {
  constructor(props) {
    super(props);
  }

  handleLoadMore = () => {
     const {artists, dispatch} = this.props;
     if (artists.next) {
        dispatch(ArtistActions.getNextArtists(artists.next));
     }
  }

  renderArtistTiles(artists,cols) {
    if (artists) {
      let arr = artists.map((tile) => (
        <GridTile
          className="boxTile"
          cols={1}
          key={'artistTile_'+ tile.id}
          rows={1}
        >
          <Tile
            {...this.props}
            albums={tile.albums}
            cols={cols}
            id={tile.id}
            imgURL={tile.cover_photo ? tile.cover_photo : url+'static/images/default-avatar.png'}
            subtitle={tile.genre}
            title={tile.name}
            type={'artist'}
          />
        </GridTile>

      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const { artists } = this.props;
    if(artists){
      return(
        <div>
          <GridList
            cols={cols}
            style={{margin:2, maxWidth:'100%', maxHeight:'100%'}}
          >
            {this.renderArtistTiles(artists.results,cols)}
          </GridList>
          <Waypoint
            onEnter={this.handleLoadMore}
          />
        </div>
      );
    }
  }
  render() {
    const {cols} = this.props;
    return(
      <div style={{width:'100%',height:'100%'}}>
        <MediaQuery query='(min-device-width: 560px)'>
          <MediaQuery query='(max-width: 559px)'>
            {this.renderGrid(cols/2)}
          </MediaQuery>
          <MediaQuery query='(min-width: 560px)'>
            {this.renderGrid(cols)}
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 559px)'>
          {this.renderGrid(cols/2)}
        </MediaQuery>
      </div>
    );
  }
}
