const debug = require("debug")("semirara:app");

import React, {Component} from "react";
import Header from "./component/header";
import Editor from "./component/editor";
import PageList from "./component/pagelist";
import "./store";
import "./socket";

export default class App extends Component{

  render(){
    debug("render()");
    return (
      <div className="app">
        <Header />
        <Editor />
        <PageList />
      </div>
    );
  }
}
