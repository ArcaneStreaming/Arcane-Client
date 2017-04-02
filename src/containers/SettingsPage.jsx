import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Avatar, Paper, TextField, SelectField, MenuItem} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { redA700, fullWhite } from 'material-ui/styles/colors'
import theme from '../constants/material-ui-theme'
import MediaQuery from 'react-responsive'
import Toggle from 'material-ui/Toggle';

import * as ThemeActions from '../actions/ThemeActions'
import { themeEnum } from '../constants/material-ui-theme'
import ThemeSwitcher from '../components/ThemeSwitcher'

const styles = {
  profileSection: {
    padding:10,
    avatarSection:{
        maxWidth:'33%',
        float:'left',
        padding:10,
    },
    inputSection: {
      width:'66%',
      float:'right'
    }
  },
  appSection: {
    padding:10
  },
  paper: {
    overflowY:'auto',
    minHeight:'60vh',
    backgroundColor:theme.palette.primary3Color
  },
};

const profileSettings = [
  {'key': 'realname','label':'Name', 'type':'text', 'defaultValue': 'Tyler Scott', 'onChange':''},
  {'key': 'username','label':'Email', 'type':'email', 'defaultValue': 'tscott8@arcane.fm', 'onChange':''},
  {'key': 'password','label':'Password', 'type':'password', 'defaultValue': 'password123', 'onChange':''},
  {'key': 'location','label':'Region', 'type':'select', 'defaultValue': 'US', 'options':['US', 'CAN', 'CHI', 'JAP', 'RUS', 'ENG', 'FRA', 'MEX'],'onChange':''},
  {'key': 'privacy_level','label':'Privay Level', 'type':'select', 'defaultValue': '0 - Everyone', 'options':['0 - Everyone', '1 - Followers', '2 - Freinds Only', '3 - Antisocial'],'onChange':''},

];
const appSettings = [
  {'key': 'theme', 'label':'Theme', 'type':'select', 'defaultValue': 'ARCANE DARK', 'options':['ARCANE DARK','ARCANE LIGHT', 'PANDORA', 'SPOTIFY', 'GOOGLE PLAY', 'CUSTOM'],'onChange':''},
  {'key': 'player_pos', 'label':'Player Position', 'type':'select', 'defaultValue': 'RIGHT DRAWER', 'options': ['RIGHT DRAWER','LEFT DRAWER', 'HEADER', 'FOOTER'], 'onChange':''},
  {'key': 'explicit', 'label':'Allow Explicit Content', 'type':'toggle', 'defaultValue': false, 'onChange':''},
  {'key': 'push_notifications', 'label':'Enable Push Notifications', 'type':'toggle', 'defaultValue': false, 'onChange':''},
  ];


class Settings extends Component {
   constructor(props) {
      super(props);
      this.state = {
        explicit:false,
        theme: 'ARCANE DARK'
      }
   }
   onChange = (e) => {
    //  console.log(e.target.value)
     this.setState({[e.target.id]:e.target.value})}
   onSelect (e,i,val) {
      const { dispatch } = this.props;
      switch(val) {
         case "ARCANE DARK":
            dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_DARK))
            break;
         case "ARCANE LIGHT":
            dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_LIGHT))
            break;
         case "PANDORA":
            dispatch(ThemeActions.changeTheme(themeEnum.PANDORA))
            break;
         case "SPOTIFY":
            dispatch(ThemeActions.changeTheme(themeEnum.SPOTIFY))
            break;
         case "GOOGLE PLAY":
            dispatch(ThemeActions.changeTheme(themeEnum.GOOGLE_PLAY))
            break;
         // case "CUSTOM":
         //    dispatch(ThemeActions.changeTheme(themeEnum.CUSTOM))
         //    break;
         default:
            break;
      }
     this.setState({[this.key]:val})
   }
   onToggle = (e, val) => {
     console.log(e.target.value, val)
     this.setState({[e.target.id]:val})
  }

   renderTextField(item) {
     return (
       <TextField
         id={item.key}
         name={item.key}
         type={item.type}
         fullWidth={true}
         defaultValue={item.defaultValue}
         floatingLabelText={item.label}
         onChange={this.onChange}
       />
     );
   }
   renderSelectField(item) {
     let options = item.options.map((option) => (
       <MenuItem key={item.options.indexOf(option)} value={option} primaryText={option}/>
     ))
     return (
       <SelectField
         id={item.key}
         name={item.key}
         type={item.type}
         fullWidth={true}
         value={this.state[item.key] ? this.state[item.key] : item.defaultValue}
         floatingLabelText={item.label}
         onChange={this.onSelect.bind(this)}
       >
         {options}
       </SelectField>
     );
   }
   renderSettingInput(setting, section) {
     if((setting.type === 'text')|| (setting.type === 'email') || (setting.type === 'password')) {
        return (
          <div key={section+'_settings_'+setting.key}
            // disabled={true}
          >
            {this.renderTextField(setting)}
          </div>
        );
      }
     if(setting.type === 'select') {
        return (
          <div key={section+'_settings_'+setting.key}
            // disabled={true}
          >
            {this.renderSelectField(setting)}
          </div>
        );
      }
      if(setting.type === 'toggle') {
        // const {[@setting.key]} = this.state
        console.info(this.state[setting.key])
         return (
           <div key={section+'_settings_'+setting.key}>
             <Toggle
               labelPosition="left"
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
     let map = collection.map((setting) => (
          this.renderSettingInput(setting, section)
    ))
    return map;
   }
   render() {
     return(
       <div style={{width: '100%', maxWidth: '75vw', margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto'}}>
         <Paper style={styles.paper}>
           <div style={styles.profileSection}>
             <div style={styles.profileSection.avatarSection}>
               <img style={{borderRadius:'50%',  width: '100%', height: 'auto'}} src={"https://scontent.xx.fbcdn.net/v/t31.0-1/13418663_10206730877055291_8028342317280224995_o.jpg?oh=2012ec2865e169040bcb3f15f2c31387&oe=59308486"}/>
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
         </Paper>
       </div>
         );
   }
}

Settings.propTypes = {
   dispatch: PropTypes.func.isRequired,
   theme: PropTypes.object.isRequired
}

//TODO Add theme change to Settings
function mapStateToProps(state) {
   const { theme } = state

   return { theme }
}

export default connect(mapStateToProps)(Settings);
