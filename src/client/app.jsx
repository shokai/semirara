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

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    this.action.unsetEditline();
    this.action.cancelTitleEdit();
  }

  render(){
    debug("render()");
    const {store} = this.props;
    return (
      <div className="app" onClick={this.onClick}>
        <div className="main">
          <Header store={store} />
          <Editor store={store} />
          <PageList store={store} />
          <div className="footer" />
        </div>
      </div>
    );
  }
}
