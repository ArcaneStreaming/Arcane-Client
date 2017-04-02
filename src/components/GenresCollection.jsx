import React, {Component} from 'react';
import {GridTile, GridList} from 'material-ui'
import Tile from './Tile'
import MediaQuery from 'react-responsive'

const url = "http://localhost:8000/";

export default class GenresCollection extends Component {
  constructor(props) {
    super(props);
  }
  renderGenreTiles(genres, cols) {
    if (genres) {
      let arr = genres.map((tile) => (
        <GridTile
          className="boxTile"
          cols={1}
          key={'genreTile_'+ tile.id}
          rows={1}
        >
          <Tile
            {...this.props}
            artists={tile.artists}
            cols={cols}
            id={tile.id}
            imgURL={tile.icon ? tile.icon : url+'static/images/base_icons/hip_hop.png'}
            title={tile.name}
            type={'genre'}
          />
        </GridTile>
      ))
      return arr;
    }
  }
  renderGrid (cols) {
    const {genres} = this.props;
    if(genres){
      return(
        <GridList
          cols={cols}
          style={{margin:2, maxWidth:'100%', maxHeight:'100%'}}
        >
          {this.renderGenreTiles(genres.results, cols)}
        </GridList>
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
