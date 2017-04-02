import React, { Component, PropTypes } from 'react'
import { Dialog, TextField, FlatButton } from 'material-ui'
import theme from '../constants/material-ui-theme'

const styles = {
  formContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'},
  formFields:{
    width:'100%'
  },
  underlineStyle:{
    borderColor:theme.palette.textColor
  },
  formActions:{
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-around',
    borderColor:'transparent',
    paddingTop:24
  },
  button:{}
}


export default class EditDialog extends Component {
   constructor(props) {
      super(props);

      this.state = {
         item: {},
         dirty: false
      }
   }

   componentWillReceiveProps(props) {
      console.info("IN will update", this.state);
      if (!this.state.item.name) {
         this.setState({item: props.item})
      }
   }

   handleChange = (e, key) => {
      console.info("IN editdialog HANDLECHANGE", )
      let item = this.state.item;
      item[key] = e.target.value;
      this.setState({item: item});
   }

   checkSpecialChars = (string) => {
     let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
     let test = format.test(string)
     // console.log(test)
     return !test
   }

   checkField = (e) => {
     let item = e.target.value;
     let key = e.target.id;
     let errKey = e.target.id+'_errors'
     let obj = this.state.item;
     obj[key] = item;
     console.log(obj)

     if (item.length < 1) { this.setState({[errKey]:['required field']})}
     else if (key !== "email" && item.length > 0 && !this.checkSpecialChars(item)) {
         this.setState({item: obj})
     }
     else { this.setState({item: obj}) }
   }

   renderTrackForm = () => {
      //TODO TYLER HELP!!!!
      console.info(this.state.item);
      if (this.state.item && this.state.item.album && this.state.item.artist)
      return (
         <div style={{display: 'inline-block', justifyContent:'space-between'}}>
            <TextField
               floatingLabelText={"Track Name"}
               id={'name'}
               name={'trackName'}
               type={'text'}
               value={this.state.item.name}
               onChange={this.checkField}
               />
            <TextField
               floatingLabelText={"Album"}
               id={'album'}
               name={'album'}
               type={'text'}
               value={this.state.item.album.name}
               onChange={this.checkField}
               />
            <TextField
               floatingLabelText={"Artist"}
               id={'artist'}
               name={'artist'}
               type={'text'}
               value={this.state.item.artist.name}
               onChange={this.checkField}
               />
         </div>
      )
   }

   renderContent = () => {
      switch (this.props.type) {
         case "track":
            return this.renderTrackForm();
      }
   }

   renderActions() {
      return (
         <div style={styles.formActions}>
           <FlatButton
             disabled={false}
             id={'cancel_form_submit'}
             key={'cancel_form_submit'}
             label={"Cancel"}
            //  onTouchTap={this.handleJoin}
             secondary
           />
           <FlatButton
             id={'save_form_cancel'}
             key={'save_form_cancel'}
             label="Save Changes"
             onTouchTap={this.props.onRequestClose}
           />
         </div>
      )
   }

   render() {
      // console.info("IN editdialog RENDER", this.props);
      const { item } = this.props;

      return (
         <Dialog
            {...this.props}
            autoDetectWindowHeight
            autoScrollBodyContent
            >
            <div>{this.renderContent(item)}</div>
            {this.renderActions()}
         </Dialog>
      )
   }
}
