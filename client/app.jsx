const debug = require("debug")("semirara:app");

import React, {Component} from "react";
import Header from "./component/header";
import Editor from "./component/editor";

export default class App extends Component{

  render(){
    debug("render()");
    return (
      <div>
        <Header />
        <Editor />
      </div>
    );
  }
}
