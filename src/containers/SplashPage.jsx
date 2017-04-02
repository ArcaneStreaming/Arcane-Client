import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { RaisedButton, Dialog } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { redA700, fullWhite } from 'material-ui/styles/colors'
import theme from '../constants/material-ui-theme'
import MediaQuery from 'react-responsive'
import LoginModal from '../components/LoginModal'

const host = "http://localhost:8000/"

const styles = {
   img: {
      position: 'absolute',
      width: '100%',
      height: '100%'
   },
   link: {
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      bottom: 50
   },
   button: {
     boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
   },
   label: {
     fontSize: '1.5em'
   },
   name: {
      position: 'absolute',
      fontFamily: 'Aldrich',
      color: fullWhite,
      marginLeft: '5vw',
      marginTop: '5vw'
   }
}

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = { open:false }
  }

  renderSplash(imgUrl) {
    return (
      <div style={{
        background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+ host + 'static/images/audience-'+imgUrl+'.jpg' + ') ',
        backgroundSize: 'cover',
        backgroundPosition:'center center',
        overflow:'hidden',
        textShadow:'1px 1px black',
        zIndex:1,
        height:'100vh',
        width:'100vw'
      }}
      ><h1 style={styles.name}>{"ARCANE"}</h1>
        <div style={styles.link}>
          <RaisedButton
            className='button-glow'
            label="Lets Go!"
            labelStyle={styles.label}
            onClick={() => {this.setState({open:true})}}
            primary
          />
        </div>
        <LoginModal
          {...this.props}
          onRequestClose={() => {this.setState({open:false})}}
          open={this.state.open}
        />
      </div>
    );
  }

  render() {

    if (this.props.children) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={theme} >
          <div>
            <MediaQuery query='(min-device-width: 560px)'>
              <MediaQuery query='(max-width: 59px)'>
                {this.renderSplash('phone')}
              </MediaQuery>
              <MediaQuery query='(min-width: 560px)'>
                {this.renderSplash('desktop')}
              </MediaQuery>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 559px)'>
              {this.renderSplash('phone')}
            </MediaQuery>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}
