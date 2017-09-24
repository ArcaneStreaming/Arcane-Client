import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class PlaylistContextMenu extends Component {

	handlePlaylistClick = (playlist, track) => () => {
		this.props.addTrackToPlaylist(playlist, track);
	}

	renderPlaylistMenuOptions = () => {
		const { playlists, track } = this.props;
		console.info(playlists);
		if (playlists) {
			return playlists.forEach((playlist) => {
				return <MenuItem primaryText={playlist.name} onItemTouchTap={this.handlePlaylistClick(playlists, track)}/>;
			});
		}
		return [];
	}

	render() {
		const { value } = this.props;
		return (
			<MenuItem
				primaryText="Add to playlist"
				value={value}
				rightIcon={<ArrowDropRight />}
				menuItems={this.renderPlaylistMenuOptions()}
				/>
		);
	}
}

PlaylistContextMenu.propTypes = {
	value: PropTypes.number,
	addTrackToPlaylist: PropTypes.func.isRequired,
};
