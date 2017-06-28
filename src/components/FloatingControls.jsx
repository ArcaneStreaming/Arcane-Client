import React, { Component } from 'react'
import { FloatingActionButton, FontIcon, CircularProgress } from 'material-ui'
import theme from '../constants/material-ui-theme'
// import * as ActionTypes from '../constants/ActionTypes'

const style = {
	fab: {
		position: 'absolute',
		right: '0',
		bottom: '0',
		marginBottom: '5vh',
		marginRight: '5vh',
		zIndex:1
	},
	progress: {
		position: 'absolute',
		right: '0',
		bottom: '0',
		MsTransform: 'rotate(-90deg)',
		WebkitTransform: 'rotate(-90deg)',
		transform: 'rotate(-90deg)'
	}
}

const controls = [
	{ "id": 1, "name": "skip_next" },
	{ "id": 2, "name": "skip_previous" },
	{ "id": 3, "name": "shuffle" },
	{ "id": 4, "name": "repeat" },
	{ "id": 5, "name": "favorite_border" },
]

export default class FloatingControls extends Component {
	constructor(props) {
		super(props);
	}

	renderFabMenu() {
		let fabs = [];

		return fabs;
	}

	render() {
		return (
			<div>
				<FloatingActionButton
					onClick={this.props.onPlay}
					style={style.fab}
					>
					<FontIcon className="material-icons">{this.props.isPlaying ? "pause" : "play_arrow"}</FontIcon>
					<CircularProgress
						color={theme.palette.alternateTextColor}
						mode="determinate"
						size={57}
						style={style.progress}
						thickness={3}
						value={this.props.percent * 100}
						/>
				</FloatingActionButton>
			</div>
		);
	}
}
