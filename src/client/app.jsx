const debug = require("debug")("semirara:app");
import React, {Component} from "react";
import Header from "./component/header";
import Editor from "./component/editor";
import Viewer from "./component/viewer";
import PageList from "./component/pagelist";
import "./socket";

export default class App extends Component{

  static get propTypes(){
    return {
      store: React.PropTypes.object.isRequired
    };
  }

  render(){
    debug("render()");
    const {store} = this.props;
    const editor = window.user ? <Editor store={store} /> : <Viewer store={store} />;
    return (
      <div className="app" onClick={() => store.dispatch({type: "editline", value: null})}>
        <Header store={store} />
        {editor}
        <PageList store={store} />
      </div>
    );
  }
}
