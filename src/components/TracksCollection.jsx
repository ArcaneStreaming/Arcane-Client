import React, { Component } from 'react';
import { Avatar,  Menu, MenuItem, Divider,  ListItem } from 'material-ui';
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Waypoint from 'react-waypoint';
import * as TrackActions from '../actions/TrackActions';
import theme from '../constants/material-ui-theme';
import TrackMenu from './TrackMenu';
import { host } from '../constants/host';

export default class TracksCollection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTracks: []
		};
	}

	handleChange = (event, value) => {
		const { select } = this.props;
		select ? select(value) : console.log('No select function prop'); //eslint-disable-line
	}

	loadMore = () => {
		const { tracks, dispatch } = this.props;
		if (tracks.next) {
			dispatch(TrackActions.getNextTracks(tracks.next));
		}
	}

	renderArt(track) {
		const { noArt } = this.props;
		if (!noArt && track) {
			return (
				<Avatar
					src={track.album.artwork ? track.album.artwork : host + 'static/images/default-artwork.png'}
					style={{ borderRadius:1 }}/>
			);
		}
		if (noArt && track) {
			return (
				<Avatar style={{ backgroundColor:'transparent', color:theme.palette.textColor }}>{track.order}</Avatar>
			);
		}
	}

	renderTracksListItems(tracks) {
		if (tracks) {
			let arr = tracks.map((track) => (
				<MenuItem
					animation={null}
					id={'tracks_collection_menu_item'+track.id}
					innerDivStyle={{ padding:0, width:'100%' }}
					key={'track_list_item_'+ track.id}
					value={track}>
					<Divider />
					<ListItem
						// style={{position:'relative', marginLeft:'.5%', marginRight:'2%'}}
						disabled
						id={'tracks_collection_menu_item_list_item'+track.id}
						innerDivStyle={{ whiteSpace:'pre-line' }}
						leftAvatar={this.renderArt(track)}
						primaryText={track.name}
						rightIconButton={
							<TrackMenu
								{...this.props}
								id={track.id}
								name={track.name}/>
						}
						secondaryText={track.artist.name + ' - ' + track.duration}/>
				</MenuItem>
			));
			return arr;
		}
	}

	render() {
		const { tracks, selectedTracks } = this.props;
		return(
			<div style={{ width:'100%',height:'100%' }}>
				<Menu
					autoWidth
					disableAutoFocus
					id={'tracks_collection_menu'}
					listStyle={{ paddingTop:0, paddingBottom:0, paddingRight:0, margin:0, maxWidth:'100%' }}
					multiple
					onChange={this.handleChange}
					selectedMenuItemStyle={{ backgroundColor:theme.palette.accent2Color }}
					value={selectedTracks ? selectedTracks : []}>
					{this.renderTracksListItems(tracks.results)}
				</Menu>
				<Waypoint onEnter={this.loadMore} />
			</div>
		);
	}

}
