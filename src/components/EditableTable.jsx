import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { TextField } from 'material-ui';

export default class EditableTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			expanded: false
		};
	}

	render() {
		const { items } = this.props;
		let listItems = items.map((item, index) => (
			<TableRow key={'edit_item_'+ index}>
				<TableRowColumn style={{ width: '1em' }}>
					{index + 1}
				</TableRowColumn>
				<TableRowColumn >
					<TextField
						key={index}
						id={'text_column_' + index}
						value={item.name}
						onChange={this.props.onValueChange}
						fullWidth/>
				</TableRowColumn>
			</TableRow>
		));
		return (
			<div>
				<Table
					selectable={false}>
					<TableHeader
						adjustForCheckbox={false}
						displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn style={{ width: '1em' }}>{'Index'}</TableHeaderColumn>
							<TableHeaderColumn>{'Track Title'}</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						stripedRows
						displayRowCheckbox={false}>{listItems}</TableBody>
				</Table>
			</div>
		);
	}
}
