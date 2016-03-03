const debug = require("debug")("semirara:app");

import React from "react";
import Login from "./component/login";
import {Component} from "./store";

export default class App extends Component{

  render(){
    debug("render()");
    return (
      <div>
        <h1>hello {this.state.app.name}</h1>
        <Login />
      </div>
    );
  }
}
