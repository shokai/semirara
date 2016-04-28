const debug = require("debug")("semirara:app");
import React from "react";
import StoreComponent from "./component/store-component";
import Header from "./component/header";
import Editor from "./component/editor";
import PageList from "./component/pagelist";

export default class App extends StoreComponent{

  mapState(state){
    return {};
  }

  render(){
    debug("render()");
    const {store} = this.props;
    return (
      <div className="app" onClick={this.action.unsetEditline}>
        <Header store={store} />
        <Editor store={store} />
        <PageList store={store} />
      </div>
    );
  }
}
