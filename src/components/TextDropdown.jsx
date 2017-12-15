import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Popover, Menu, MenuItem } from 'material-ui';

export default class TextDropdown extends Component {
	static propTypes = {
		id: PropTypes.string,
		value: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		options: PropTypes.array,
	}

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	renderPopoverContents = () => {
		const { options } = this.props;
		return options ? options.map(option => (
			<MenuItem
				key={option.id}
				value={option.id}
				primaryText={option.name}
				/>
		)) : [];
	}

	onTextFocus = () => {
		this.setState({ open: true }, this.textField.focus());
	}

	render() {
		const { options, ...rest } = this.props;
		return (
			<div
				ref={(div) => this.container = div}
				>
				<TextField
					floatingLabelText='Album Name'
					id={this.props.id}
					type={'text'}
					value={this.props.value}
					onChange={this.props.onChange}
					onFocus={this.onTextFocus}
					ref={(field) => this.textField = field}
					{...rest}
					/>
				{
					options &&
					<Popover
						open={this.state.open}
						anchorEl={this.container}
						onRequestClose={() => this.setState({ open: false })}
						useLayerForClickAway={false}
						>
						<Menu>
						{this.renderPopoverContents()}
						</Menu>
					</Popover>

				}
			</div>
		)
	}
}
