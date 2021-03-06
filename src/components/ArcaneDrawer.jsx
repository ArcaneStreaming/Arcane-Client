import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'material-ui';
import ArcaneMenu from './ArcaneMenu';

const drawerStyle = {
	height: 'calc(100vh - 64px)',
	top:'64px',
	overflowY:'auto',
};

const ArcaneDrawer = (props) => {
	return (
		<Drawer
			{...props}
			containerStyle={drawerStyle}
			docked={false}
			>
			<ArcaneMenu onClick={props.onClose} currentUser={props.currentUser} />
		</Drawer>
	);
};

ArcaneDrawer.propTypes = {
	onClose: PropTypes.func,
	currentUser: PropTypes.object,
};
export default ArcaneDrawer;
