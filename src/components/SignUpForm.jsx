import React , {Component, PropTypes} from 'react';
import {TextField, FlatButton} from 'material-ui'
import theme from '../constants/material-ui-theme'
import cookie from 'react-cookie';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ProfileActions from '../actions/ProfileActions'

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
class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name:null,
        first_name_errors:[],
        last_name:null,
        last_name_errors:[],
        email: null,
        email_errors:[],
        username:null,
        username_errors:[],
        password:null,
        password_errors:[],
        confirm_errors:[]
      };
  }

  checkSpecialChars = (string) => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let test = format.test(string)
    // console.log(test)
    return !test
  }

  checkLength = (string, length) => {
    let test = string.length >= length ? true : false;
    // console.log('length', test)
    return test
  }

  checkField = (e) => {
    let item = e.target.value;
    let key = e.target.id;
    let errKey = e.target.id+'_errors'
    console.log(key)

    if (item.length < 1) { this.setState({[errKey]:['required field']})}
    else if (key !== "email" && item.length > 0 && !this.checkSpecialChars(item)) {
        this.setState({[key]:item, [errKey]:['invalid '+key]})
    }
    else { this.setState({[key]:item, [errKey]:[]}) }
  }

  verifyPassword = (e) => {
    let p = e.target.value;
    if (p.length < 1) { this.setState({password_errors:['required field']}) }
    else if (p.length > 0 && (!this.checkLength(p, 8) || !this.checkSpecialChars(p))) { // and check if not in db
      this.setState({password:p, password_errors:['invalid password']})
    } else { this.setState({password:p, password_errors:[]}) }
  }

  confirmPassword = (e) => {
    let item = e.target.value;
    console.log(item, this.state.password)
    if(item.length < 1)
      this.setState({confirm_errors: ['required field']})
    else if(item !== this.state.password)
        this.setState({confirm_errors: ['passwords do not match']})
    else
      this.setState({confirm_errors: []})
  }

  handleJoin= () => {
    this.postUser();
  }

  formHasErrors () {
    const {email_errors, password_errors, first_name_errors, last_name_errors, username_errors, confirm_errors} = this.state;
    if (email_errors.length > 0 || password_errors.length > 0 || first_name_errors.length > 0 || last_name_errors.length > 0 || username_errors.length > 0 || confirm_errors.length > 0) { return true; }
    else { return false; }
  }

  formIsEmpty () {
    const {first_name, last_name, email, password, username} = this.state;
    if (!(email && password && first_name && last_name && username)) { return true; }
    else { return false; }
  }

  postUser () {
     let csrftoken = cookie.load('csrftoken');
     let fd = new FormData();
     fd.append('enctype', 'multipart/form-data')
     fd.append('email', this.state.email)
     fd.append('username', this.state.username)
     fd.append('password', this.state.password)
     fd.append('first_name',this.state.first_name)
     fd.append('last_name', this.state.last_name)
     fetch("http://localhost:8000/api/users/users/", {
         method: "post",
         headers: {
           "X-CSRFToken": csrftoken
         },
         credentials: "same-origin",
        body:fd
         }).then(response => response.json()).then((json) => {
            if (json.token) {
               const { dispatch } = this.props;
               window.sessionStorage.setItem("token", json.token);
               window.sessionStorage.setItem('currentUser', json.listener);
               dispatch(ProfileActions.getCurrentUser(json.listener));
               dispatch(push('/app/'));
            }
            else if (!json.token) {
              let content = new FormData();
              content.append('enctype', 'multipart/form-data');
              content.append('username', this.state.username);
              content.append('password', this.state.password);
              fetch("http://localhost:8000/api/auth/", {
                method: "post",
                header: {
                  "X-CSRFToken": csrftoken
                },
                credentials: "same-origin",
                body: content
              }).then(response => response.json()).then((json) => {
                if (json.token) {
                   const { dispatch } = this.props;
                   window.sessionStorage.setItem("token", json.token);
                   window.sessionStorage.setItem('currentUser', json.listener);
                   dispatch(ProfileActions.getCurrentUser(json.listener));
                   dispatch(push('/app/'));
                } else {
                   if (json.username) {
                      this.setState({username_errors: [json.username]});
                   }
                   if (json.password) {
                      this.setState({password_errors: [json.password]});
                   }
                   if (json.detail) {
                      this.setState({username_errors: [json.detail]});
                   }
                   if (json.non_field_errors) {
                      this.setState({username_errors: [json.non_field_errors], password_errors: [json.non_field_errors]})
                   }
                }
              });
            }

         })
  }

  renderActions () {
    return (
      <div style={styles.formActions}>
        <FlatButton
          disabled={this.formHasErrors() || this.formIsEmpty()}
          id={'join_form_submit'}
          key={'join_form_submit'}
          label={"Join Arcane"}
          onTouchTap={this.handleJoin}
          secondary
        />
        <FlatButton
          id={'join_form_cancel'}
          key={'join_form_cancel'}
          label="Cancel"
          onTouchTap={this.props.handleCancel}
        />
      </div>
  );
  }

  render() {
    const {email_errors, username_errors, confirm_errors, password_errors, first_name_errors, last_name_errors}=this.state;
    return(
      <div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TextField
            errorText={first_name_errors.length > 0 ? first_name_errors.join(', '): null}
            floatingLabelText={'First Name'}
            fullWidth
            hintText={'Johnny'}
            id={'first_name'}
            name={'first_name'}
            onChange={this.checkField}
            style={{maxWidth:"47.5%"}}
            type={'text'}

          />
          <TextField
            errorText={last_name_errors.length >0 ? last_name_errors.join(', '): null}
            floatingLabelText={'Last Name'}
            fullWidth
            hintText={'Lingo'}
            id={'last_name'}
            name={'last_name'}
            onChange={this.checkField}
            style={{maxWidth:"47.5%"}}
            type={'text'}
          />
        </div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TextField
            errorText={email_errors.length > 0 ? email_errors.join(', '): null}
            floatingLabelText={'Email'}
            fullWidth
            hintText={'user.name@arcane.fm'}
            id={'email'}
            name={'email'}
            onChange={this.checkField}
            style={{maxWidth:"47.5%"}}
            type={'email'}
          />
          <TextField
            errorText={username_errors.length > 0 ? username_errors.join(', '): null}
            floatingLabelText={'Username'}
            fullWidth
            hintText={'login with this'}
            id={'username'}
            name={'username'}
            onChange={this.checkField}
            style={{maxWidth:"47.5%"}}
            type={'text'}
          />
        </div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TextField
            errorText={password_errors.length > 0 ? password_errors.join(', '): null}
            floatingLabelText={'Password'}
            fullWidth
            hintText={'insert at least 8 non-special characters'}
            id={'password'}
            name={'password'}
            onChange={this.verifyPassword}
            style={{maxWidth:"47.5%"}}
            type={'password'}
          />
          <TextField
            errorText={confirm_errors.length >0 ? confirm_errors.join(', '): null}
            floatingLabelText={'Confirm Password'}
            fullWidth
            hintText={'re-type your password'}
            id={'confirm_pass'}
            name={'confirm_pass'}
            onChange={this.confirmPassword}
            style={{maxWidth:"47.5%"}}
            type={'password'}
          />
        </div>
        {this.renderActions()}
      </div>
    );
  }
}
SignUpForm.propTypes = {
   dispatch: PropTypes.func.isRequired
}

export default connect()(SignUpForm);
