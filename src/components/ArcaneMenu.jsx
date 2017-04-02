import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui'
import SquareButton from './SquareButton'

// const url = "http://localhost:8000/";

const menuList = [
  { "name": "Browse", "icon": "subscriptions", "url":"browse"},
  { "name": "Playlists", "icon": "subject", "url":"playlists/1" },
  { "name": "Upload", "icon": "cloud_upload", "url": "upload" },
  { "name": "Radio", "icon": "radio", "url": "radio"},
  { "name": "My Music", "icon": "library_music", "url": "my_music"},
  { "name": "Profile", "icon": "account_circle", "url": "profile/1"},
  { "name": "About", "icon": "info", "url": "about"},
  { "name": "Settings", "icon": "settings", "url": "settings"}
];

const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height:'auto',
    marginTop:3
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  gridTile: {
    // maxHeight: 'calc((100vh - 64px)/8)',
    // minHeight:'calc((100vh - 64px)/6)',
  }
};

export default class ArcaneMenu extends Component {
  constructor(props){
    super(props);
  }
  renderMenuMap() {
    let map = menuList.map((tile) => (
      <GridTile
        cols={tile.featured ? 2 : 1}
        key={tile.name}
        rows={tile.featured ? 2 : 1}
      >
        <SquareButton
          icon={tile.icon}
          key={"menuTile" + tile.name}
          name={tile.name}
          onClick={this.props.onClick}
          url={tile.url}
        />
      </GridTile>
    ))
    return map;
  }
  render () {
    return (
      <div style={gridStyle.root}>
        <GridList
          cellHeight={'auto'}
          cols={2}
          style={gridStyle.gridList}
        >
          {this.renderMenuMap()}
        </GridList>
      </div>
    );
  }
}
