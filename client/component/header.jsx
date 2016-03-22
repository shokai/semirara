import React from "react";
import {Component} from "../store";

import Login from "./login";

export default class Header extends Component{

  mapState(state){
    const {wiki, title} = state.page;
    return {wiki, title};
  }

  render(){
    return(
      <div>
        <h1>{this.state.wiki}::{this.state.title}</h1>
        <Login />
      </div>
    );
  }
}
