import React, { Component, PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import EditDialog from '../components/EditDialog'

export default class EditableTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: {},
         expanded: false
      }
   }

   onRequestClose = () => {this.setState({expanded: false})}

   handleEditSelect = (e) => {
      console.info("IN editabletable handleEditSelect", e);
      this.setState({selected: this.props.items[e[0]], expanded: true});
   }

   render() {
      const { items } = this.props;
      //console.log("IN editabletable RENDER");
      let listItems = items.map((item) => (
         <TableRow key={'edit_item_'+ items.indexOf(item)}>
            <TableRowColumn>{ item.name }</TableRowColumn>
         </TableRow>
      ))
      //console.log("IN editabletable RENDER after listItems", listItems);
      return (
         <div>
            <Table
             onRowSelection={this.handleEditSelect}
            >
                <TableHeader enableSelectAll>
                   <TableRow>
                     <TableHeaderColumn>{"Name"}</TableHeaderColumn>
                   </TableRow>
                </TableHeader>
                <TableBody
                   deselectOnClickaway={true}
                   stripedRows
                >{listItems}</TableBody>
            </Table>
            <EditDialog
              {...this.props}
              type={"track"}
              item={this.state.selected}
              onRequestClose={this.handleClose}
              open={this.state.expanded} />
         </div>
      )
   }
}
