import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'
import Waypoint from 'react-waypoint'
import * as AlbumActions from '../actions/AlbumActions'

const url = "http://localhost:8000/";

export default class AlbumsCollection extends Component {
  constructor(props) {
    super(props);
  }

  handleLoadMore = () => {
     const {albums, dispatch} = this.props;
     if (albums.next) {
        dispatch(AlbumActions.getNextAlbums(albums.next));
     }
  }

  renderAlbumTiles(albums, cols) {
    if (albums) {
      let arr = albums.map((tile) => (
        <GridTile
          className="boxTile"
          cols={1}
          key={'albumTile_'+ tile.id}
          rows={1}
        >
          <Tile
            {...this.props}
            cols={cols}
            id={tile.id}
            imgURL={tile.artwork ? tile.artwork : url+'static/images/default-artwork.png'}
            subtitle={tile.artist}
            title={tile.name}
            tracks={tile.tracks}
            type={'album'}
          />
        </GridTile>
      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const { albums } = this.props;
    if(albums){
      return(
        <div>
          <GridList
            cols={cols}
            // cellHeight={200}
            style={{margin:2, maxWidth:'100%', maxHeight:'100%'}}
          >
            {this.renderAlbumTiles(albums.results, cols)}
          </GridList>
          <Waypoint
            onEnter={this.handleLoadMore}
          />
        </div>
      );
    }
  }
  render() {
    const { cols } = this.props;
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
