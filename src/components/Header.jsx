import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import ArcaneDrawer from './ArcaneDrawer';
import NowPlayingDrawer from './NowPlayingDrawer';
import RightActions from './RightActions';

import * as ProfileActions from '../actions/ProfileActions';

const host = '/api/search/';


class Header extends Component  {

	constructor(props){
		super(props);
		this.state = {
			leftOpen:false,
			rightOpen:false,
			searching:false,
			dataSource: [],
			isArtistView: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ isArtistView: props.currentUser.artist !== null });
	}

			handleLeftClose = () => { this.setState({ leftOpen: false }); }

			handleRightClose = () => { this.setState({ rightOpen: false }); }

			handleLeftToggle = () => { this.setState({ leftOpen: !this.state.leftOpen }); }

			handleRightToggle = () => { this.setState({ rightOpen: !this.state.rightOpen }); }

			handleSearchClick = () => { this.setState({ searching: !this.state.searching }); }

			getSearchResults = (query) => {
				fetch(host + '?query=' + query)
					.then(response => response.json())
					.then(json => (this.setState({
						dataSource: json.results
					})));
			}

			handleSignOut = () => {
				const { dispatch } = this.props;
				window.sessionStorage.removeItem('token');
				dispatch(push('/'));
			}

			handleViewToggle = (e, isToggled) => {
				this.setState({ isArtistView: isToggled });
				this.props.dispatch(ProfileActions.toggleUserView(isToggled));
			}

			render() {
				return (
					<div>
						<ArcaneDrawer
							currentUser={this.props.currentUser}
							onClose={this.handleLeftClose}
							onRequestChange={(leftOpen) => this.setState({ leftOpen })}
							open={this.state.leftOpen}/>
						<NowPlayingDrawer
							{...this.props}
							onClose={this.handleRightClose}
							onRequestChange={(rightOpen) => this.setState({ rightOpen })}
							open={this.state.rightOpen}/>
						<AppBar
							iconElementRight={
								<RightActions
									currentUser={this.props.currentUser}
									dataSource={this.state.dataSource}
									onDrawerClick={this.handleRightToggle}
									onSearchClick={this.handleSearchClick}
									onUpdate={this.getSearchResults}
									searching={this.state.searching}
									onSignOut={this.handleSignOut}
									isToggled={this.state.isArtistView}
									onViewSwitch={this.handleViewToggle}/>
							}
							iconStyleRight={{ maxWidth:'66vw' }}
							onLeftIconButtonTouchTap={this.handleLeftToggle}
							primary
							title={'Arcane'}
							titleStyle={{ maxWidth:'33vw' }}/>
					</div>
				);
			}
}

export default connect()(Header);
