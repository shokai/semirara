const debug = require("debug")("semirara:component:login");

import React from "react";
import {Component} from "../store";

export default class Login extends Component {

  render(){
    debug("render()");
    if(!this.state.user){
        return <ul><li><a href="/auth/login">login</a></li></ul>
      }
    else{
      return (
        <ul>
          <li><img src={this.state.user.icon}></img></li>
          <li>{this.state.user.name}</li>
          <li><a href="/auth/logout">logout</a></li>
        </ul>
      );
    }
  }
}
