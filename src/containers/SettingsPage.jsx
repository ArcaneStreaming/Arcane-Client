import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, SelectField, MenuItem } from 'material-ui';
import theme from '../constants/material-ui-theme';
import Toggle from 'material-ui/Toggle';

import * as ThemeActions from '../actions/ThemeActions';
import { themeEnum } from '../constants/material-ui-theme';
import ImageUploader from '../components/ImageUploader';

const styles = {
	profileSection: {
		padding:10,
		verticalAlign: 'middle',
		avatarSection:{
			width:'33%',
			float: 'left',
			padding:10,
			height: '100%',
		},
		inputSection: {
			width:'66%',
			float:'right',
		},
	},
	appSection: {
		padding:10,
	},
	paper: {
		overflowY:'auto',
		minHeight:'60vh',
		backgroundColor:theme.palette.primary3Color,
	},
};

const profileSettings = [
	{ 'key': 'realname','label':'Name', 'type':'text', 'defaultValue': 'John Doe', 'onChange':'' },
	{ 'key': 'username','label':'Email', 'type':'email', 'defaultValue': 'jdoe@example.com', 'onChange':'' },
	{ 'key': 'password','label':'Password', 'type':'password', 'defaultValue': 'password123', 'onChange':'' },
	{ 'key': 'location','label':'Region', 'type':'select', 'defaultValue': 'US', 'options':['US', 'CAN', 'CHI', 'JAP', 'RUS', 'ENG', 'FRA', 'MEX'],'onChange':'' },
	{ 'key': 'privacy_level','label':'Privay Level', 'type':'select', 'defaultValue': '0 - Everyone', 'options':['0 - Everyone', '1 - Followers', '2 - Freinds Only', '3 - Antisocial'],'onChange':'' },
];

const appSettings = [
	{ 'key': 'theme', 'label':'Theme', 'type':'select', 'defaultValue': 'ARCANE DARK', 'options':['ARCANE DARK','ARCANE LIGHT', 'SPOTIFY', 'GOOGLE PLAY', 'PANDORA', 'CUSTOM'],'onChange':'' },
	{ 'key': 'player_pos', 'label':'Player Position', 'type':'select', 'defaultValue': 'RIGHT DRAWER', 'options': ['RIGHT DRAWER','LEFT DRAWER', 'HEADER', 'FOOTER'], 'onChange':'' },
	{ 'key': 'explicit', 'label':'Allow Explicit Content', 'type':'toggle', 'defaultValue': false, 'onChange':'' },
	{ 'key': 'push_notifications', 'label':'Enable Push Notifications', 'type':'toggle', 'defaultValue': false, 'onChange':'' },
];


class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			explicit:false,
			theme: 'ARCANE DARK',
			defaultPic: 'https://www.explainxkcd.com/wiki/images/6/6d/BlackHat_head.png',
			profilePic: {},
		};
	}

	onUpload = ( file ) => {
		this.setState({ profilePic: file });
	}

	onChange = (e) => {
		this.setState({ [e.target.id]:e.target.value });
	}

	onSelect = (e,i,val) => {
		const { dispatch } = this.props;
		switch(val) {
			case themeEnum.ARCANE_DARK:
				dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_DARK));
				break;
			case themeEnum.ARCANE_LIGHT:
				dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_LIGHT));
				break;
			case themeEnum.PANDORA:
				dispatch(ThemeActions.changeTheme(themeEnum.PANDORA));
				break;
			case themeEnum.SPOTIFY:
				dispatch(ThemeActions.changeTheme(themeEnum.SPOTIFY));
				break;
			case themeEnum.GOOGLE_PLAY:
				dispatch(ThemeActions.changeTheme(themeEnum.GOOGLE_PLAY));
				break;
			default:
				break;
		}
		this.setState({ [e.key]: e.options[val] });
	}

	onToggle = (e, val) => {
		this.setState({ [e.target.id]: val });
	}

	renderTextField(item) {
		console.info('In renderTextField: ', item);
		return (
			<TextField
				id={item.key}
				name={item.key}
				type={item.type}
				fullWidth={true}
				defaultValue={item.defaultValue}
				floatingLabelText={item.label}
				onChange={this.onChange}
				value={this.props.profile.currentUser[item.key]}
			/>
		);
	}

	renderSelectField(item) {
		console.info('In renderSelectField ', item);
		let options = item.options.map((option) => (
			<MenuItem key={item.options.indexOf(option)} value={option} primaryText={option}/>
		));
		return (
			<SelectField
				id={item.key}
				name={item.key}
				type={item.type}
				fullWidth={true}
				value={this.state[item.key] ? this.state[item.key] : item.defaultValue}
				floatingLabelText={item.label}
				onChange={this.onSelect.bind(null, item)} // eslint-disable-line react/jsx-no-bind
			>
				{options}
			</SelectField>
		);
	}

	renderSettingInput(setting, section) {
		console.info('In renderSettingInput', setting.type);
		if((setting.type === 'text')|| (setting.type === 'email') || (setting.type === 'password')) {
			return (
				<div
					key={section+'_settings_'+setting.key}
				>
					{ this.renderTextField(setting) }
				</div>
			);
		}
		if(setting.type === 'select') {
			return (
				<div
					key={section+'_settings_'+setting.key}
				>
					{this.renderSelectField(setting)}
				</div>
			);
		}
		if(setting.type === 'toggle') {
			return (
				<div key={section+'_settings_'+setting.key}>
					<Toggle
						labelPosition='left'
						label={setting.label.toUpperCase()}
						id={setting.key}
						toggled={this.state[setting.key]}
						onToggle={this.onToggle}
					/>
				</div>
			);
		}
	}

	renderSettings(collection, section) {
		console.info('In renderSettings');
		let map = collection.map((setting) => (
			this.renderSettingInput(setting, section)
		));
		return map;
	}

	render() {
		return(
			<div style={{ width: '100%', maxWidth: '75vw', margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto' }}>
				<Paper style={styles.paper}>
					<div
						style={{
							height: 'calc(100vh - 64px)',
							overflowY: 'auto',
							padding: 10,
						}}
					>
						<div style={styles.profileSection}>
							<div style={styles.profileSection.avatarSection}>
								<ImageUploader
									tooltip='Add Profile Picture'
									handleFileUpload={ this.onUpload }
									url={ this.props.profile.currentUser.avatar ? this.props.profile.currentUser.avatar : this.state.defaultPic }
								/>
							</div>
							<div style={styles.profileSection.inputSection}>
								{this.renderSettings(profileSettings,'profile')}
							</div>
						</div>

						<div>
							{/* <ThemeSwitcher /> */}
						</div>

						<div style={styles.appSection}>
							{this.renderSettings(appSettings, 'app')}
						</div>
					</div>
				</Paper>
			</div>
		);
	}
}

Settings.propTypes = {
	dispatch: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	const { theme, profile } = state;

	return { theme, profile };
}

export default connect(mapStateToProps)(Settings);
