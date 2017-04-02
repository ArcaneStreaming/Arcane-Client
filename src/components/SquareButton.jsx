import React, { Component } from 'react'
import {FontIcon, RaisedButton} from 'material-ui'
import { Link } from 'react-router'

const styles = {
  root:{
    minWidth:100,
    minHeight:100,
    width:'100%',
    height:'auto',
    textAlign:'center'
  },
  guts: {
    root:{
      width:'100%',
      height:'100%',
      minWidth:'6rem',
      minHeight:'6rem',
      padding:10
    },
    icon: {
      width:'100%',
      fontSize:'6rem',
      verticalAlign:'bottom',
      display:'block'
    },
    label: {
      marginTop:'.5rem',
      width:'100%',
      fontSize:'2rem',
      verticalAlign:'bottom',
      display:'block',
      overflowX:'hidden'
    }
  }
};

export default class SquareButton extends Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate () {
        return true;}

  renderButtonGuts(){
    return(
      <div style={styles.guts.root}>
        <FontIcon
          className="material-icons"
          style={styles.guts.icon}
        >{this.props.icon}</FontIcon>
        <span style={styles.guts.label}>{this.props.name}</span>
      </div>
    );
  }
  render() {
    return (
      <Link to={"/app/" + this.props.url}>
        <RaisedButton
          href=""
          onClick={this.props.onClick}
          secondary
          style={styles.root}
          target="_blank"
        >
          {this.renderButtonGuts()}
        </RaisedButton>
      </Link>
    );
  }
}
