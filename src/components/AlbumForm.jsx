import React, { Component, PropTypes } from 'react';
import { TextField, SelectField, MenuItem, AutoComplete } from 'material-ui';
import ImageUploader from './ImageUploader';

export default class AlbumForm extends Component {
	static propTypes = {
		genres: PropTypes.array.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			selectedGenre: this.props.album.genre,
		};
	}
	componentWillReceiveProps(nextProps) {
		console.info('recieved props');
		this.setState({ selectedGenre: nextProps.album.genre });
	}

	handleGenreSelect = (event, index, value) => {
		this.setState({ selectedGenre: value });
		this.props.handleGenreChange(this.props.genres[index]);
	}

	renderGenreOptions = (genres) => {
		const genreOptions = [];
		genres.map((genre) => {
			genreOptions.push(<MenuItem value={genre.id} key={'genre_' + genre.id} primaryText={genre.name} />);
		});

		return genreOptions;
	}

	render() {
		const albums = this.props.albums.artistAlbums.results;
		const dataSource = albums ? albums.map(album => ({ text: album.name, value: album.id })) : [];
		return (
			<div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<AutoComplete
						floatingLabelText='Album Name'
						searchText={this.state.value}
						fullWidth
						style={{ width: '47.5%' }}
						id={'album_name'}
						name={'album_name'}
						value={this.props.album.name}
						onUpdateInput={this.props.handleNameChange}
						onNewRequest={this.props.handleNameSelect}
						dataSource={dataSource}
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
				<div style={{ margin: 'auto', height: '200px', width: '200px', marginTop: '2vh' }}>
					<ImageUploader
						tooltip='Add Album Artwork'
						name='Album Artwork'
						handleFileUpload={this.props.handleFileUpload}
						url={this.props.album.artwork || undefined}
						/>
				</div>
			</div>
		);
	}
}

