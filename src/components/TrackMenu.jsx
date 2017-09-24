import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, IconMenu } from 'material-ui';
import PlaylistContextMenu from './PlaylistContextMenu';
import { addTrackToPlaylist } from '../actions/PlaylistActions';

export default class TrackMenu extends Component {
	static propTypes = {
		id: PropTypes.number,
		name: PropTypes.string,
		dispatch: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			actions: ['startRadio', 'playNext', 'addToQueue', 'addToPlaylist', 'goToArtist', 'goToAlbum'],
		};
	}

	handleSelect = (val1, val2) => {
		const { id, name, dispatch } = this.props;
		dispatch(addTrackToPlaylist(id, val1));
		console.info(name, val2, 'in handleSelect');
	}

	handlePlaylistAdd = (playlist) => {
		const { id, dispatch } = this.props;
		dispatch(addTrackToPlaylist(id, playlist));
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
<<<<<<< HEAD
				<PlaylistContextMenu value='1' addTrackToPlaylist={this.handlePlaylistAdd} />
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
=======
				<PlaylistContextMenu value={1} addTrackToPlaylist={this.handleSelect} />
				{/* <MenuItem
					primaryText="Start radio"
					value={0}
				/>
				<MenuItem
					primaryText="Play next"
					value={1}
				/>
				<Divider />
				<MenuItem
					primaryText="Add to queue"
					value={2}
				/>
				<MenuItem
					primaryText="Add to playlist"
					value={3}
					/>
				<Divider />
				<MenuItem
					primaryText="Artist info"
					value={4}
				/>
				<MenuItem
					primaryText="Album info"
					value={5}
					/>*/}
>>>>>>> master
			</IconMenu>
		);
	}
}
