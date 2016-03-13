import React from "react";
import {Component} from "../store";

import Login from "./login";

export default class Header extends Component{

  mapState(state){
    return {app: state.app};
  }

  render(){
    return(
      <div>
        <h1>{this.state.app.name}</h1>
        <Login />
      </div>
    );
  }
}
