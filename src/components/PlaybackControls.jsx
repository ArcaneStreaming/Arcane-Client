import React from 'react'
import {IconButton} from 'material-ui'
import theme from '../constants/material-ui-theme'

const styles = {
   smallIcon: {
     width:20,
     height:20,
     fontSize:20
   },
   mediumIcon: {
     width:40,
     height:40,
     fontSize:40
   },
   coloredSmallIcon: {
    color: theme.palette.alternateTextColor,
     width:20,
     height:20,
     fontSize:20
   },
   largeIcon: {
     width:60,
     height:60,
     fontSize:60
   },
   small: {
     width: 25,
     height: 25,
     padding:2,
     verticalAlign:'super'
   },
   medium: {
     width:45,
     height:45,
     padding:2,
     verticalAlign:'bottom'
   },
   large: {
     width: 65,
     height: 65,
     padding:4
   },
   hover: {
    color: 'red'
   }
};

const IconChangeControl = (props) => {
  return (
    <IconButton
      //  {...props}
      hoveredStyle={styles.hover}
      iconClassName="material-icons"
      iconStyle={styles.mediumIcon}
      onClick={props.onClick}
      style={styles.medium}
    >
      {!props.flag ? props.icon1 : props.icon2}
    </IconButton>
  );
};
export {IconChangeControl};

const ColoredControl = (props) => {
  return (
    <IconButton
      // {...props}
      hoveredStyle={styles.hover}
      iconClassName="material-icons"
      iconStyle={!props.flag ? styles.smallIcon : styles.coloredSmallIcon}
      onClick={props.onClick}
      style={styles.small}
    >
      {props.icon}
    </IconButton>
  );
}
export {ColoredControl};

const DefaultControl = (props) => {
  return(
    <IconButton
      // {...props}
      hoveredStyle={styles.hover}
      iconClassName="material-icons"
      iconStyle={styles.smallIcon}
      onClick={props.onClick}
      style={styles.small}
    >
      {props.icon}
    </IconButton>
  );
}
export {DefaultControl};
