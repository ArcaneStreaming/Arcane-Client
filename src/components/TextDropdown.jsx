import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Popover } from 'material-ui';

export default class TextDropdown extends Component {
	static propTypes = {
		id: PropTypes.number,
		value: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		options: PropTypes.object,
	}

	renderPopoverContents = () => {
		const { options = [] } = this.props;
		return options.map(option => (
			<MenuItem />
		));
	}

	render() {
		return (
			<div>
				<TextField
					floatingLabelText='Album Name'
					fullWidth
					id={this.props.id}
					style={{ maxWidth: '47.5%' }}
					type={'text'}
					value={this.props.value}
					onChange={this.props.onChange}
					/>
				<Popover
					>
					<Menu>
					{this.renderPopoverContents()}
					</Menu>
				</Popover>
			</div>
		)
	}
}
