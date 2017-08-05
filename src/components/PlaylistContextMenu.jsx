import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class PlaylistContextMenu extends Component {

	handlePlaylistClick = (playlist, track) => () => {
		this.props.addTrackToPlaylist(playlist, track);
	}

	renderPlaylistMenuOptions = () => {
		const { playlists, track } = this.props;
		return playlists.forEach((playlist) => {
			return <MenuItem primaryText={playlist.name} onItemTouchTap={this.handlePlaylistClick(playlists, track)}/>;
		});
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
	value: PropTypes.string,
	addTrackToPlaylist: PropTypes.func.isRequired,
};
