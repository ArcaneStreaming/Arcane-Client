import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { getUserPlaylists } from '../actions/PlaylistActions';

class PlaylistContextMenu extends PureComponent {
	constructor(props) {
		super(props);
		if (props.playlists === undefined) {
			props.dispatch(getUserPlaylists(props.currentUser.id));
		}
	}

	handlePlaylistClick = (playlist, track) => () => {
		this.props.addTrackToPlaylist(playlist, track);
	}

	renderPlaylistMenuOptions = () => {
		const { playlists, track } = this.props;
		console.info(playlists, track);
		if (playlists) {
			return playlists.map((playlist) => (
				<MenuItem
					primaryText={playlist.name}
					onClick={this.handlePlaylistClick(playlist, track)}
					/>
			));
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
	value: PropTypes.string,
	track: PropTypes.object,
	addTrackToPlaylist: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
	playlists: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	return {
		playlists: state.playlists.playlists,
		currentUser: state.profile.currentUser,
	};
}

export default connect(mapStateToProps)(PlaylistContextMenu);
