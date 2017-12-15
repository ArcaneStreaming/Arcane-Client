import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Paper, FlatButton, CircularProgress, Snackbar } from 'material-ui';
import theme from '../constants/material-ui-theme';
import EditableTable from './EditableTable';
import AlbumForm from './AlbumForm';

const styles = {
	paper: {
		overflowY:'auto',
		height:'60vh',
		backgroundColor:theme.palette.primary3Color,
	},
	dropzone: {
		height:'100%',
		width:'100%',
		textAlign:'center',
		text: {
			padding:'10%',
			height:'100%',
			width:'100%',
			margin:0,
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	},
	spinner: {
		padding:'5%',
		height:'100%',
		width:'100%',
		margin:0,
		textAlign:'center',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	text: {
		textAlign: 'center',
		margin: 0,
		display: 'flex',
		justifyContent: 'center',
	},
};

export default class Uploader extends Component  {

	constructor(props){
		super(props);

		this.state = {
			stagedFiles: [],
			editedFiles: [],
			stepIndex: 0,
			snackOpen: false,
			message:'',
			album: {
				name: '',
				artist: -1,
				genre: -1,
				artwork: null,
			},
			isAlbumInfoValid: false,
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ album: { ...this.state.album, artist: props.currentUser.artist } });
	}

	handleNext = () => {
		const { stepIndex } = this.state;
		if (stepIndex < 3) {
			this.setState({ stepIndex: stepIndex + 1 });
		}
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

	onDrop = (acceptedFiles) => {
		const { editedFiles } = this.state;
		acceptedFiles.forEach((file) => {
			editedFiles.push({ name: file.name });
		});
		this.setState({ stepIndex: 2, stagedFiles: acceptedFiles, editedFiles: editedFiles });
	};

	handleSelect = (rows) => { this.setState({ confirmedFiles:rows }); }

	handleSnackClose = () => { this.setState({ snackOpen: false }); }

	uploadTracks(files, filenames, album) {
		// let token = cookie.load('csrftoken');
		let fd = new FormData();
		fd.append('enctype', 'multipart/form-data');
		files.forEach((file) => {
			fd.append('uploadfiles', file, file.name);
		});
		filenames.forEach((filename) => {
			fd.append('filenames', filename.name);
		});
		fd.append('artist', album.artist);
		fd.append('albumName', album.name);
		fd.append('albumArtwork', album.artwork, album.artwork.name);
		fd.append('albumGenre', album.genre);
		fetch('/api/upload/', {
			method: 'post',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'X-CSRFToken': csrftoken,  //eslint-disable-line no-undef
			},
			credentials: 'same-origin',
			body:fd,
		})
			.then(response => response.json())
			.then(json => (
				this.setState({ stepIndex: 4, snackOpen: true, stagedFiles: json.tracks })
			));
	}

	handleUpload = () => {
		const { stagedFiles, editedFiles, album } = this.state;

		this.uploadTracks(stagedFiles, editedFiles, album);
		this.setState({ message: stagedFiles.length + ' file(s) uploaded' , stagedFiles: [], stepIndex:3 });
	}

	handleAlbumArtworkSubmit = (artwork) => {
		this.setState({ album: { ...this.state.album, artwork: artwork } });
	}

	handleAlbumNameChange = (text) => {
		this.setState({ album: { ...this.state.album, name: text }, isAlbumInfoValid: this.isAlbumValid() });
	}
	handleExistingAlbumSelect = (text, index) => {
		if (index >= 0) this.setState({ album: this.props.albums.artistAlbums.results[index], isAlbumInfoValid: this.isAlbumValid() });
		else this.handleAlbumNameChange(text);
	}

	handleAlbumGenreChange = (genre) => {
		console.info('genre', genre);
		this.setState({ album: { ...this.state.album, genre: genre.id }, isAlbumInfoValid: this.isAlbumValid() });
	}

	handleEditedTitle = (event, newValue) => {
		const { editedFiles } = this.state;
		let index = event.target.id.replace(/\D/g, '');

		editedFiles[index].name = newValue;
		this.setState({ editedFiles: editedFiles, isAlbumInfoValid: this.isAlbumValid() });
	}

	isAlbumValid() {
		return true;
		// return this.state.album.genre != -1 &&
		//        this.state.album.name != '' &&
		//        this.state.album.artwork != null;
	}

	getStepContent() {
		switch (this.state.stepIndex) {
			case 0:
				return this.renderAlbumCreate();
			case 1:
				return this.renderDropzone();
			case 2:
				return this.renderEditTable();
			case 3:
				return (
					<div style={styles.spinner}>
						<CircularProgress
							color={theme.palette.accent1Color}
							size={300}
							thickness={5}
							/>
					</div>
				);
			case 4:
				return this.renderFinished();
			default:
				return 'You\'re a long way from home!';
		}
	}

	renderAlbumCreate() {
		return (
			<div style={{ height: '100%', width: '95%', margin: 'auto' }}>
				<AlbumForm
					{...this.props}
					genres={this.props.genres.results ? this.props.genres.results : []}
					album={this.state.album}
					handleFileUpload={this.handleAlbumArtworkSubmit}
					handleNameChange={this.handleAlbumNameChange}
					handleGenreChange={this.handleAlbumGenreChange}
					handleNameSelect={this.handleExistingAlbumSelect}
					/>
			</div>
		);
	}

	renderStaged() {
		const { stagedFiles } = this.state;
		if (stagedFiles) {
			let listItems = stagedFiles.map((file) => (
				<TableRow key={'uploaded_'+ stagedFiles.indexOf(file)}>
					<TableRowColumn>{ file.name }</TableRowColumn>
				</TableRow>
			));
			return (
				<Table
					multiSelectable
					onRowSelection={this.handleSelect}
					>
					<TableHeader enableSelectAll>
						<TableRow>
							<TableHeaderColumn>{'Name'}</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						deselectOnClickaway={false}
						stripedRows
						>
						{listItems}
					</TableBody>
				</Table>
			);
		}
	}

	renderEditTable() {
		const { editedFiles } = this.state;
		if (editedFiles.length) {
			return (
				<EditableTable
					items={editedFiles}
					onValueChange={this.handleEditedTitle}
					/>
			);
		}
	}
	renderDropzone() {
		return (
			<Dropzone
				accept="audio/mp3"
				onDrop={this.onDrop}
				ref={(node) => { this.dropzone = node; }}
				style={styles.dropzone}
				>
				<h3 style={styles.dropzone.text}>
					{'Try dropping some files here, or click to select files to upload.'}
				</h3>
			</Dropzone>
		);
	}

	renderFinished() {
		return (
			<div>
				<h3 style={styles.text}>All done!</h3>
			</div>
		);
	}

	renderActionButtons() {
		const { stepIndex, stagedFiles } = this.state;
		let action = null;
		if ( stepIndex === 1 && stagedFiles !== 'none') {
			action =
				<FlatButton
					// disabled={this.state.stagedFiles.length < 1}
					label="Edit"
					onTouchTap={this.handleNext}
					labelStyle={this.state.stepIndex !== 1 ? { color:'red' } : {}}
					primary
					/>;
		} else if (stepIndex === 0) {
			action =
				<FlatButton
					disabled={!this.state.isAlbumInfoValid}
					label="Next"
					labelStyle={this.state.isAlbumInfoValid ? { color:'red' } : { color: 'gray' }}
					onTouchTap={this.handleNext}
					primary
					/>;
		} else if (stepIndex === 2) {
			action =
				<FlatButton
					label="Upload"
					onTouchTap={this.handleUpload}
					secondary
					/>;
		}
		return (
			<div style={{ marginTop: 20 }}>
				<FlatButton
					disabled={stepIndex === 0 || stepIndex === 3}
					label="Back"
					onTouchTap={this.handlePrev}
					style={{ marginRight: 12 }}
					/>
				{action}
			</div>
		);
	}

	render() {
		const contentStyle = { margin: '0 16px' };
		return (
			<div
				style={{
					width: '100%',
					maxWidth: '75vw',
					margin: 'auto',
					marginTop:10,
					maxHeight:'calc(100vh-64px)',
					overflowY:'auto'
				}}
				>
				<Stepper
					activeStep={this.state.stepIndex}
					linear
					>
					<Step>
						<StepButton
							onClick={() => this.setState({ stepIndex: 0 })}
							>
							Create
						</StepButton>
					</Step>
					<Step>
						<StepButton
							onClick={() => this.setState({ stepIndex: 1 })}
							>
							Add
						</StepButton>
					</Step>
					<Step>
						<StepButton
							onClick={() => this.setState({ stepIndex: 2 })}
							>
							Edit
						</StepButton>
					</Step>
					<Step>
						<StepButton
							onClick={() => this.setState({ stepIndex: 3 })}
							>
							Upload
						</StepButton>
					</Step>
				</Stepper>
				<div style={contentStyle}>
					<Paper style={styles.paper}>{this.getStepContent()}</Paper>
					{this.renderActionButtons()}
				</div>
				<Snackbar
					autoHideDuration={4000}
					message={this.state.message}
					onRequestClose={this.handleSnackClose}
					open={this.state.snackOpen}
					/>
			</div>
		);
	}
}
