import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import Dropzone from 'react-dropzone';

const styles = {
	outerDiv: {
		width: '100%',
		height: '100%',
		margin: 'auto'
	},
	dropzone: {
		position: 'relative',
		textAlign: 'center',
		marginTop: 'calc(-50% + 30px)'
	},
	dropIcon: {
		margin: 'auto',
		height: '60px',
		width: '60px',
		zIndex: '5',
		opacity: '0.30'
	},
	imgPreview: {
		position: 'relative',
		width: '100%',
		height: '100%',
		zIndex: '1'
	}
};

export default class ImageUploader extends Component {
   constructor(props) {
      super(props);

   }

	handleDrop = (droppedFiles) => {
		var reader = new FileReader();

		reader.onload = function(e) {
			this.imgPreview.src = e.target.result;
		}.bind(this);

		// console.info(dropedFile)
		reader.readAsDataURL(droppedFiles[0]);

		this.props.handleFileUpload(droppedFiles[0]);
	}

	render() {
		return (
			<div style={{  }}>
				<div style={{ textAlign: 'center' }}>{this.props.name}</div>
				<div style={styles.outerDiv} >
					<img
						ref={(img) => { this.imgPreview = img; }}
						id='imgPreview'
						src={this.props.url}
						style={styles.imgPreview}
						/>
					<Dropzone
						accept='image/jpeg,image/png'
						onDrop={this.handleDrop}
						ref={(node) => { this.dropzone = node; }}
						style={styles.dropzone}
						multiple={false}
						>
						<IconButton
						style={styles.dropIcon}
						iconClassName='material-icons'
						tooltip={this.props.tooltip}
						tooltipPosition='bottom-right'
						hoveredStyle={{
							backgroundColor: '#000',
							opacity: '0.75',
							transition: 'all 0.5s',
							WebkitTransition: 'all 0.5s',
							MozTransition: 'all 0.5s',
							zIndex: '5'
						}}
						>file_upload</IconButton>
					</Dropzone>
				</div>
			</div>

		);
	}
}

ImageUploader.propTypes = {
   handleFileUpload: PropTypes.func.isRequired
};

ImageUploader.defaultProps = {
   url: ''
};
