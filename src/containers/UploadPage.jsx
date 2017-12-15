import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Uploader from '../components/Uploader';
import * as GenreActions from '../actions/GenreActions';
import * as AlbumActions from '../actions/AlbumActions';

class Track {
	constructor() {
		this.name = '';
		this.duration = '';
		this.length = 0;
		this.url = null;
		this.artist = null;
		this.album = null;
		this.genre = null;
	}
}


class UploadPage extends Component {
	constructor(props) {
		super(props);
		this.state = { tracks: [] };
		this.props.dispatch(GenreActions.getGenres());
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.currentUser.artist !==
			this.props.profile.currentUser.artist) {
			this.props.dispatch(
				AlbumActions.getArtistAlbums(
					nextProps.profile.currentUser.artist
				));
		}
	}

	addTrack = (track) => {
		let newTrack = new Track();
		newTrack.url = track;
	}

	render() {
		return (
			<div>
				<Uploader
					addTrack={this.addTrack}
					dispatch={this.props.dispatch}
					genres={this.props.genres}
					currentUser={this.props.profile.currentUser}
					{...this.props}
					/>
			</div>
		);
	}
}

UploadPage.propTypes = {
	dispatch: PropTypes.func.isRequired,
	genres: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	albums: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	const { genres, profile, albums } = state;

	return {
		genres,
		profile,
		albums,
	};
}

export default connect(mapStateToProps)(UploadPage);
