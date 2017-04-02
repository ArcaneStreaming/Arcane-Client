import React , {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import cookie from 'react-cookie'
import {TextField, FlatButton, Dialog} from 'material-ui'
import theme from '../constants/material-ui-theme'
import { Link } from 'react-router'
import SignUpForm from '../components/SignUpForm'

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
    paddingTop:24,
  },
  button:{}
}
class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: "",
        username_errors:[],
        password:"",
        password_errors:[]
      };
  }
  checkSpecialChars = (string) => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let test = format.test(string)
   //  console.log(test)
    return !test
  }
  checkLength = (string, length) => {
    let test = string.length >= length ? true : false;
   //  console.log('length', test)
    return test
  }
  checkUsername = (e) => {
   //  console.log('checking user exists...')
    let u = e.target.value;
    if (u.length < 1) { this.setState({username_errors:['required field']}) }
    else if (u.length > 0 && !this.checkSpecialChars(u)) { // and check if not in db
      this.setState({username:u, username_errors:['invalid username']})
    } else { this.setState({username:u, username_errors:[]}) }
  }
  verifyPassword = (e) => {
   //  console.log('verifying password with username...')
    let p = e.target.value;
    if (p.length < 1) { this.setState({password_errors:['required field']}) }
    else if (p.length > 0 && (!this.checkLength(p, 8) || !this.checkSpecialChars(p))) { // and check if not in db
      this.setState({password:p, password_errors:['invalid password']})
    } else { this.setState({password:p, password_errors:[]}) }
  }

  handleLogin = () => {
   let csrftoken = cookie.load('csrftoken');
   let content =  new FormData();
   content.append('enctype', 'multipart/form-data');
   content.append('username', this.state.username);
   content.append('password', this.state.password);
    fetch("http://localhost:8000/api/auth/", {
      method: "POST",
      headers: {
         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
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
   })
  }
  handleJoin = () => {this.setState({createUser:true})};

  formHasErrors () {
    const {username_errors, password_errors} = this.state;
    if (username_errors.length > 0 || password_errors.length > 0) { return true; }
    else { return false; }
  }
  formIsEmpty () {
    const {username, password} = this.state;
    if (username.length < 1 || password.length < 1) { return true; }
    else { return false; }
  }
  renderActions () {
    return (
      <div style={styles.formActions}>
        <FlatButton
          // containerElement={this.renderLink()}
          disabled={this.formHasErrors()}
          id={'login_form_submit'}
          key={'login_form_submit'}
          label={"Login"}
          onTouchTap={this.handleLogin}
          secondary
        />
        <FlatButton
          id={'login_form_join'}
          key={'login_form_join'}
          label="Join Us"
          onTouchTap={this.handleJoin}
        />
      </div>
      );
  }
  renderLink () {
    if (!this.formHasErrors() && !this.formIsEmpty())
      return <Link to={"/app/"} />
  }
  renderContents () {
    const {username_errors, password_errors}=this.state;

    if (this.state.createUser) {
      return (
        <SignUpForm {...this.props}
          handleCancel={() => this.setState({createUser:false})}
        />
      )
    }
    else {
      return(
        <div>
          <TextField
            errorText={username_errors.length > 0 ? username_errors.join(', '): null}
            floatingLabelText={'Username'}
            fullWidth
            id={'login_form_username'}
            name={'login_form_username'}
            onChange={this.checkUsername}
            type={'email'}
            // value={this.state.username}
          />
          <TextField
            errorText={password_errors.length >0 ? password_errors.join(', '): null}
            floatingLabelText={'Password'}
            fullWidth
            id={'login_form_password'}
            name={'login_form_password'}
            onChange={this.verifyPassword}
            type={'password'}
          />
          {this.renderActions()}
        </div>
      )
    }

  }
  render() {
    return(
      <Dialog
        {...this.props}
        actions={null}
        // actionsContainerStyle={styles.formActions}
        autoDetectWindowHeight
        autoScrollBodyContent
        id={"login_form_container"}
        title={null}
      >
        {this.renderContents()}
      </Dialog>
    );
  }
}

LoginModal.propTypes = {
   dispatch: PropTypes.func.isRequired
}

export default connect()(LoginModal);
