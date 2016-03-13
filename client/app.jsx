const debug = require("debug")("semirara:app");

import React, {Component} from "react";
import Header from "./component/header";

export default class App extends Component{

  render(){
    debug("render()");
    return (
      <div>
        <Header />
      </div>
    );
  }
}
