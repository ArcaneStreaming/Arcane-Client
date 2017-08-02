import React from 'react';
import { IconMenu, IconButton, MenuItem, Avatar, Toggle } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SearchBox from './SearchBox';
import makeExpanding from './ExpandingAnimation';

const ExpandingSearchBox = muiThemeable()(makeExpanding(SearchBox));

const RightActions = (props) => (
	<div
		style={{ display:'flex', flexDirection:'row', justifyContent:'flex-end' }}
	>
		<ExpandingSearchBox {...props} />
		<IconMenu
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			style={props.currentUser.avatar ? { display:'flex', flexDirection:'column', justifyContent:'center',
				paddingLeft:4, paddingRight:4,
			} : null}
			iconButtonElement={props.currentUser.avatar ?
				<Avatar
					src={props.currentUser.avatar}
				/> :
				<IconButton iconClassName="material-icons">{'person'}</IconButton>
			}
			iconStyle={!props.currentUser.avatar ? { color: props.muiTheme.palette.alternateTextColor } : null}
			targetOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<MenuItem primaryText="Profile" />
			<MenuItem primaryText="Help" />
			<MenuItem primaryText="Sign out" onClick={props.onSignOut}/>
			<MenuItem>
				<Toggle label="Artist View" onToggle={props.onViewSwitch} toggled={props.isToggled} />
			</MenuItem>
		</IconMenu>
		<IconButton
			iconClassName="material-icons"
			iconStyle={{ color: props.muiTheme.palette.alternateTextColor }}
			onClick={props.onDrawerClick}
		>
			{'queue_music'}
		</IconButton>
	</div>
);
export default muiThemeable()(RightActions);
