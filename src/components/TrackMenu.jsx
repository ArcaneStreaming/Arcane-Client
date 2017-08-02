import React, { Component } from 'react';
import {  IconButton, IconMenu, MenuItem } from 'material-ui';

export default class TrackMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actions: ['startRadio', 'playNext', 'addToQueue', 'addToPlaylist', 'goToArtist', 'goToAlbum'],
		};
	}

	handleSelect = (e, value) => {
		const { id, name } = this.props;
		const { actions } = this.state;
		alert('Dispatch '+actions[value]+' for track: ('+id+' : '+name+')');
	}

	render() {
		return(
			<IconMenu
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				iconButtonElement={
					<IconButton iconClassName="material-icons">{'more_vert'}</IconButton>}
				onChange={this.handleSelect}
				style={{ position:'absolute', top:12, right:'3%', padding:0 }}
				// style={{display:'inline-flex', flexDirection:'row', justifyContent:'flex-end'}}
				targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
				<PlaylistContextMenu value={1} addTrackToPlaylist={this.handleSelect}
				{// <MenuItem
				// 	primaryText="Start radio"
				// 	value={0}
				// />
				// <MenuItem
				// 	primaryText="Play next"
				// 	value={1}
				// />
				// <Divider />
				// <MenuItem
				// 	primaryText="Add to queue"
				// 	value={2}
				// />
				// <MenuItem
				// 	primaryText="Add to playlist"
				// 	value={3}
				// 	/>
				// <Divider />
				// <MenuItem
				// 	primaryText="Artist info"
				// 	value={4}
				// />
				// <MenuItem
				// 	primaryText="Album info"
				// 	value={5}
				// />
				}
			</IconMenu>
		);
	}
}
