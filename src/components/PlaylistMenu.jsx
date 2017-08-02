import React, { Component } from 'react';
import {  IconButton, IconMenu, MenuItem } from 'material-ui';

import * as PlaylistActions from '../actions/PlaylistActions';

export default class PlaylistMenu extends Component {

	constructor(props) {
		super(props);
	}

	handleSelect = (e, value) => {
		// console.log('IN handleSelect', item, e);
		const { playlist, dispatch } = this.props;

		switch (value) {
			case 0:
				break;
			case 1:
				if (confirm('Are you sure you want to delete this playlist?'))
					dispatch(PlaylistActions.deletePlaylist(playlist));
				break;
		}
	}

	render() {
		return (
			<IconMenu
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				iconButtonElement={
					<IconButton iconClassName="material-icons">{'more_vert'}</IconButton>
				}
				onChange={this.handleSelect}
				style={{ position:'absolute', top:12, right:'3%', padding:0 }}
				// style={{display:'inline-flex', flexDirection:'row', justifyContent:'flex-end'}}
				targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
				<MenuItem
					primaryText="Edit Playlist Name"
					value={0}
					/>
				<MenuItem
					primaryText="Delete Playlist"
					value={1}
					/>
			</IconMenu>
		);
	}
}
