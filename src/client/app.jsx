const debug = require("debug")("semirara:app");
import React from "react";
import StoreComponent from "./component/store-component";
import Header from "./component/header";
import Editor from "./component/editor";
import Viewer from "./component/viewer";
import PageList from "./component/pagelist";
import hasDom from "has-dom";

export default class App extends StoreComponent{

  mapState(state){
    return {};
  }

  render(){
    debug("render()");
    const {store} = this.props;
    const editor = hasDom() && window.user ? <Editor store={store} /> : <Viewer store={store} />;
    return (
      <div className="app" onClick={this.action.unsetEditline}>
        <Header store={store} />
        {editor}
        <PageList store={store} />
      </div>
    );
  }
}
