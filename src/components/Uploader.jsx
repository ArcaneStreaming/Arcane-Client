import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Paper, FlatButton,  CircularProgress, Snackbar} from 'material-ui';
import cookie from 'react-cookie';
import theme from '../constants/material-ui-theme'
import EditableTable from '../components/EditableTable'

const styles = {
  paper: {
    overflowY:'auto',
    height:'60vh',
    backgroundColor:theme.palette.primary3Color
  },
  dropzone: {
    height:'100%',
    width:'100%',
    textAlign:'center',
    text: {
      padding:'10%',
      height:'100%',
      width:'100%',
      margin:0,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  },
  spinner: {
    padding:'5%',
    height:'100%',
    width:'100%',
    margin:0,
    textAlign:'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  }
};
export default class Uploader extends Component  {

  constructor(props){
    super(props);
    this.state = {
      stagedFiles: [],
      confirmedFiles: [],
      dirty: false,
      completed: 0,
      stepIndex: 0,
      snackOpen: false,
      message:''
    }
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 3) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  onDrop = (acceptedFiles) => { this.setState({stepIndex: 1, stagedFiles: acceptedFiles}); };

  handleSelect (rows) { this.setState({confirmedFiles:rows})}

  handleSnackClose = () => { this.setState({ snackOpen: false }); }

  uploadTracks(files) {
     let csrftoken = cookie.load('csrftoken');
     let fd = new FormData();
     fd.append('enctype', 'multipart/form-data')
     files.forEach((file) => {
       fd.append('uploadfiles', file, file.name)
     });
     fetch("http://localhost:8000/api/upload/", {
         method: "post",
         headers: {
         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
         "X-CSRFToken": csrftoken
         },
         credentials: "same-origin",
         body:fd
         })
      .then(response => response.json())
      .then(json => (console.log(json),
         this.setState({ stepIndex: 3, snackOpen: true, stagedFiles: json.tracks })
      ));
  }

  handleUpload = () => {
    const {stagedFiles, confirmedFiles} = this.state;
    console.log(stagedFiles)
    let uploadFiles = []
    if (confirmedFiles !== 'all') {
      for (let i=0; i < confirmedFiles.length; i++) {
           uploadFiles.push(stagedFiles[confirmedFiles[i]]);
      }
    }
    else {
      uploadFiles = stagedFiles;
    }
    console.info("Sending files: ", uploadFiles);
    // const { dispatch } = this.props;
    this.uploadTracks(uploadFiles);
    this.setState({message: stagedFiles.length + ' file(s) uploaded' , stagedFiles: [], confirmedFiles:[], stepIndex:2});
  }

  getStepContent() {
   switch (this.state.stepIndex) {
     case 0:
       return this.renderDropzone();
     case 1:
       return this.renderStaged();
     case 2:
       return (<div style={styles.spinner}>
         <CircularProgress
           color={theme.palette.accent1Color}
           size={300}
           thickness={5}
         /></div>);
     case 3:
       return this.renderEditTable();
     default:
       return 'You\'re a long way from home sonny jim!';
   }
 }

  renderStaged() {
    const {stagedFiles} = this.state;
    if (stagedFiles) {
    let listItems = stagedFiles.map((file) => (
      <TableRow key={'uploaded_'+ stagedFiles.indexOf(file)}>
        <TableRowColumn>{ file.name }</TableRowColumn>
      </TableRow>
      ))
      return (
        <Table
          multiSelectable
          onRowSelection={this.handleSelect.bind(this)}
        >
          <TableHeader enableSelectAll>
            <TableRow>
              <TableHeaderColumn>{"Name"}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            stripedRows
          >{listItems}</TableBody>
        </Table>
      );
    }
  }
  renderEditTable() {
     const {stagedFiles} = this.state;
     if (stagedFiles) {
        return <EditableTable items={stagedFiles}/>
     }
  }
  renderDropzone() {
    return (
          <Dropzone
            accept="audio/mp3"
            onDrop={this.onDrop}
            ref={(node) => { this.dropzone = node; }}
            style={styles.dropzone}
          >
            <h3 style={styles.dropzone.text}>
              {"Try dropping some files here, or click to select files to upload."}
            </h3>
            {/* <iframe src="http://localhost:8000/api/list"></iframe> */}
          </Dropzone>
    );
  }
  renderActionButtons() {
    const {stepIndex, confirmedFiles} = this.state;
    let action = null;
    if ( stepIndex === 1 && confirmedFiles !=="none") {
      action =
        <FlatButton
          disabled={this.state.confirmedFiles.length < 1}
          label="Upload"
          onTouchTap={this.handleUpload}
          secondary
        />
    }
    else if (stepIndex < 2) {
      action =
        <FlatButton
          disabled={this.state.confirmedFiles === "none" && this.state.stepIndex === 1}
          label="Next"
          labelStyle={this.state.stepIndex !== 1 ? {color:'red'} : {}}
          onTouchTap={this.handleNext}
          primary
        />
    }
    else if (stepIndex === 3){
      action =
         <FlatButton
           disabled={this.state.dirty === false}
           label="Submit Changes"
           labelStyle={this.state.stepIndex !== 1 ? {color:'red'} : {}}
           onTouchTap={this.handleNext}
           primary
        />
    }
    return (
      <div style={{marginTop: 20}}>
        <FlatButton
          disabled={stepIndex === 0}
          label="Back"
          onTouchTap={this.handlePrev}
          style={{marginRight: 12}}
        />
        {action}
      </div>);
  }
  render() {
    const contentStyle = {margin: '0 16px'};
      return (
        <div style={{width: '100%', maxWidth: '75vw', margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto'}}>
          <Stepper
            activeStep={this.state.stepIndex}
            linear
          ><Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Choose
            </StepButton>
          </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
                Confirm
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
                Upload
              </StepButton>
            </Step>
            <Step>
               <StepButton onClick={() => this.setState({stepIndex: 3})}>
                  Edit
               </StepButton>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            <Paper style={styles.paper}>{this.getStepContent()}</Paper>
            {this.renderActionButtons()}
          </div>
          <Snackbar
            autoHideDuration={4000}
            message={this.state.message}
            onRequestClose={this.handleSnackClose}
            open={this.state.snackOpen}
          />
        </div>
    );
  }
}
