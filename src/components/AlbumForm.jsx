import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, MenuItem } from 'material-ui';
import ImageUploader from './ImageUploader';

export default class AlbumForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedGenre: this.props.album.genre
		};
	}

	handleGenreSelect = (event, index, value) => {
		this.setState({ selectedGenre: value });
		this.props.handleGenreChange(this.props.genres[index]);
	}

	renderGenreOptions = (genres) => {
		const genreOptions = [];
		genres.map((genre) => {
			genreOptions.push(<MenuItem value={genre.name} key={'genre_' + genre.id} primaryText={genre.name} />);
		});

		return genreOptions;
	}

	render() {
		return (
			<div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<TextField
						floatingLabelText='Album Name'
						fullWidth
						id={'album_name'}
						name={'album_name'}
						style={{ maxWidth: '47.5%' }}
						type={'text'}
						value={this.props.album.name}
						onChange={this.props.handleNameChange}
						/>
					<SelectField
						floatingLabelText='Album Genre'
						fullWidth
						id={'album_genre'}
						name={'album_genre'}
						style={{ maxWidth: '47.5%' }}
						value={this.state.selectedGenre}
						onChange={this.handleGenreSelect}
						>
						{this.renderGenreOptions(this.props.genres)}
					</SelectField>
				</div>
				<div style={{ width: '100%', marginTop: '2vh' }}>
					<ImageUploader
						tooltip='Add Album Artwork'
						name='Album Artwork'
						handleFileUpload={this.props.handleFileUpload}
						/>
				</div>
			</div>
		);
	}
}

AlbumForm.propTypes = {
	genres: PropTypes.array.isRequired
};
