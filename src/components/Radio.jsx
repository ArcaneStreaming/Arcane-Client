import React, { Component } from 'react';
// import Slider from 'react-slick'
import clone from 'lodash/clone';
import RadioTile from './RadioTile';
import { host } from '../constants/host';

const styles = {
	root:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		width:'100vw',
		height:'calc(100vh - 64px)',
		paddingLeft:40,
		paddingRight:40
	},
	leftPreview:{
		display:'flex',
		flexDirection:'column',
		justifyContent:'center'
	},
	smallDiv: {
		height:300,
		width:300
	},
	centerPreview:{
		display:'flex',
		flexDirection:'column',
		justifyContent:'center'
	},
	currentlyPlaying:{
		display:'flex',
		flexDirection:'column',
		justifyContent:'center',
		height: 'calc(100vh - 124px)',
		width:'calc(100vh - 124px)'
	},
	rightPreview:{
		display:'flex',
		flexDirection:'column',
		justifyContent:'center'
	},
	outerDiv:  {
		display: 'flex',
		flexDirection:'column',
		justifyContent:'center',
		bottom:0,
		height: 'calc(100vh - 64px)',
		width: '100vw',
		maxWidth:'calc(100vh - 64px)',
		marginLeft:'auto',
		marginRight:'auto',
		padding:30
	},
	innerDiv: {
	}
};


export default class Radio extends Component  {
	constructor(props){
		super(props);
	}

	buildLists (tracks) {
		let list = tracks.completed.map(clone);
		list.push(tracks.currentlyPlaying);
		list = list.concat(tracks.upcoming);
		let leftPreview = tracks.completed ? tracks.completed[tracks.completed.length-1] : null;
		let rightPreview = tracks.upcoming ? tracks.upcoming[0] : null;
		let currentlyPlaying = tracks.currentlyPlaying ? tracks.currentlyPlaying : null;
		return { list:list, leftPreview:leftPreview, rightPreview:rightPreview, currentlyPlaying:currentlyPlaying };
	}

	renderPreview(item, style,className) {
		if (item && item.id) {
			return(
				<div style={style}>
					<RadioTile
						{...this.props}
						className={className ? className : null}
						// disliked
						id={item ? item.id : -1}
						imgURL={item && item.album.artwork ? item.album.artwork : host + 'static/images/default-artwork.png'}
						liked
						subtitle={item ? item.artist.name : 'No Artist'}
						title={item ? item.name : -1}/>
				</div>
			);
		}
	}

	render() {
		const { tracks } = this.props;
		const { leftPreview, rightPreview, currentlyPlaying } = this.buildLists(tracks);
		return (
			<div style={styles.root}>
				<div style={styles.leftPreview}>
					{this.renderPreview(leftPreview, styles.smallDiv, null)}
				</div>
				<div style={styles.centerPreview}>
					{this.renderPreview(currentlyPlaying, styles.currentlyPlaying, this.props.isPlaying ? 'button-pulse' : '')}
				</div>
				<div style={styles.rightPreview}>
					{this.renderPreview(rightPreview, styles.smallDiv, null)}
				</div>
			</div>
		);
	}
}
