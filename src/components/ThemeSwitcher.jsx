import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dialog, Paper, SelectField, MenuItem, Divider} from 'material-ui'
import theme from '../constants/material-ui-theme'
import {SwatchesPicker} from 'react-color'
import * as ThemeActions from '../actions/ThemeActions'
import { themeEnum } from '../constants/material-ui-theme'
import { spacing, getMuiTheme } from 'material-ui/styles';

const styles = {
  paper: {
    overflowY:'auto',
    minHeight:'60vh',
    backgroundColor:theme.palette.primary3Color
  }
};

const fields = [
  {'key': 'theme', 'label':'Theme', 'type':'select', 'defaultValue': 'ARCANE DARK', 'options':['ARCANE DARK','ARCANE LIGHT', 'PANDORA', 'SPOTIFY', 'GOOGLE PLAY', 'CUSTOM']}]

const customFields = [
   {'key':'primary1Color', 'label':'Primary 1 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'primary2Color', 'label':'Primary 2 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'primary3Color', 'label':'Primary 3 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'accent1Color', 'label':'Accent 1 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'accent2Color', 'label':'Accent 2 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'accent3Color', 'label':'Accent 3 Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'textColor', 'label':'Text Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'secondaryTextColor', 'label':'Secondary Text Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'alternateTextColor', 'label':'Alternate Text Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'canvasColor', 'label':'Canvas Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'borderColor', 'label':'Border Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'disabledColor', 'label':'Disabled Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'pickerHeaderColor', 'label':'Picker Header Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'clockCircleColor', 'label':'Clock Circle Color', 'type':'picker', 'defaultValue':'#000000'},
   {'key':'shadowColor', 'label':'Shadow Color', 'type':'picker', 'defaultValue':'#000000'}
];
class ThemeSwitcher extends Component {
   constructor(props) {
      super(props);
      this.state = {
        open:false,
        theme: 'ARCANE DARK'
      }
   }
   onSelect (e,i,val) {
      const { dispatch } = this.props;
      switch(val) {
         case "ARCANE DARK":
            dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_DARK))
            this.setState({theme:'ARCANE DARK'})
            break;
         case "ARCANE LIGHT":
            dispatch(ThemeActions.changeTheme(themeEnum.ARCANE_LIGHT))
            this.setState({theme:'ARCANE LIGHT'})
            break;
         case "PANDORA":
            dispatch(ThemeActions.changeTheme(themeEnum.PANDORA))
            this.setState({theme:'PANDORA'})
            break;
         case "SPOTIFY":
            dispatch(ThemeActions.changeTheme(themeEnum.SPOTIFY))
            this.setState({theme:'SPOTIFY'})
            break;
         case "GOOGLE PLAY":
            dispatch(ThemeActions.changeTheme(themeEnum.GOOGLE_PLAY))
            this.setState({theme:'GOOGLE PLAY'})
            break;
         case "CUSTOM":
            this.handleOpen()
            // dispatch(ThemeActions.changeTheme(themeEnum.CUSTOM))
            break;
         default:
            break;
      }
     this.setState({[this.key]:val})
   }
  handleOpen = () => {
     this.setState({open:true})
  }
  handleChange = (color,e) => {
    // console.log('in change complete', color, e)
      this.setState({ primary1Color: color.hex });
    };
  handleClose = () => {
    const { dispatch } = this.props;
    console.log("in handleClose")
    let theme = {
      spacing: spacing,
      fontFamily: 'Aldrich, Open Sans, sans-serif',
      palette: {
        primary1Color: this.state.primary1Color,
        primary2Color: this.state.primary2Color,
        primary3Color: this.state.primary3Color,
        accent1Color: this.state.accent1Color,
        accent2Color: this.state.accent2Color,
        accent3Color: this.state.accent3Color,
        textColor: this.state.textColor,
        secondaryTextColor: this.state.secondaryTextColor,
        alternateTextColor: this.state.alternateTextColor,
        canvasColor: this.state.canvasColor,
        borderColor: this.state.borderColor,
        disabledColor: this.state.disabledColor,
        pickerHeaderColor: this.state.pickerHeaderColor,
        clockCircleColor: this.state.clockCircleColor,
        shadowColor: this.state.shadowColor
      }
    };
    let newTheme = getMuiTheme(theme);
     dispatch(ThemeActions.changeTheme(newTheme));
     this.setState({theme:'CUSTOM', open:false})
  }
   renderPickerField(item) {
     return (
       <div style={{}}>
         <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:10}}>
           <div style={{display:'flex', flexDirection:'column', justifyContent:'center', float:'left'}}>{item.label}</div>
           <div style={{float:'right'}}>
             <SwatchesPicker
               color={this.state.background}
               id={item.key}
               name={item.key}
               onChange={this.handleChange}
             />
           </div>
         </div>
         <Divider />
       </div>
     );
   }
   renderSelectField(item) {
     let options = item.options.map((option) => (
       <MenuItem
         key={item.options.indexOf(option)}
         primaryText={option}
         value={option}
       />
     ))
     return (
       <SelectField
         floatingLabelText={item.label}
         fullWidth
         id={item.key}
         name={item.key}
         onChange={this.onSelect.bind(this)}
         type={item.type}
         value={this.state[item.key] ? this.state[item.key] : item.defaultValue}
       >{options}</SelectField>
     );
   }

   renderSettingInput(setting) {
    //  console.log(setting)
     if(setting.type !== 'picker') {
        return (
          <div key={'theme_settings_'+setting.key}>
            {this.renderSelectField(setting)}
          </div>
        );
      }
      else {
        return (
          <div key={'theme_settings_'+setting.key}>
            {this.renderPickerField(setting)}
          </div>
        );
      }
   }

   renderSettings(collection) {
     let map = collection.map((setting) => (
          this.renderSettingInput(setting)
    ))
    return map;
   }
   render() {
     return (
         <div>
            {/*<div style={{width: '100%', maxWidth: '75vw', margin: 'auto', marginTop:10, maxHeight:'calc(100vh-64px)', overflowY:'auto'}}>
            <Paper style={styles.paper}>*/}
           {this.renderSettings(fields)}

           <Dialog
             autoDetectWindowHeight
             autoScrollBodyContent
             open={this.state.open}
             onRequestClose={this.handleClose}>
             {this.renderSettings(customFields)}
           </Dialog>
         {/*</Paper>*/}
       </div>
         );
   }
}

ThemeSwitcher.propTypes = {
   dispatch: PropTypes.func.isRequired,
   theme: PropTypes.object.isRequired
}

//TODO Add theme change to Settings
function mapStateToProps(state) {
   const { theme } = state

   return { theme }
}

export default connect(mapStateToProps)(ThemeSwitcher);
