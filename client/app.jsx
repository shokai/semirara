const debug = require("debug")("semirara:app");

import React, {Component} from "react";
import Header from "./component/header";
import Editor from "./component/editor";
import Viewer from "./component/viewer";
import PageList from "./component/pagelist";
import {store} from "./store";
import "./socket";

const editor = store.getState().user ? <Editor /> : <Viewer />;

export default class App extends Component{

  render(){
    debug("render()");
    return (
      <div className="app" onClick={() => store.dispatch({type: "editline", value: null})}>
        <Header />
        {editor}
        <PageList />
      </div>
    );
  }
}
