import React from "react";
import {Component, store} from "../store";
import EditorLine from "./editorline";

export default class Editor extends Component {

  constructor(){
    super();
    this.stopEdit = this.stopEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  mapState(state){
    return {page: state.page, user: state.user};
  }

  render(){
    this.debug("render()");
    const lines = Object.keys(this.state.page.lines).map(i => {
      i = parseInt(i);
      let line = this.state.page.lines[i];
      return (
        <li key={i}>
          <EditorLine
             value={line}
             edit={this.state.page.editline === i}
             onStartEdit={() => this.startEdit(i)}
             onChange={value => store.dispatch({type: "updateLine", value})}
             onKeyDown={e => this.onKeyDown(e)}
             />
        </li>
      );
    });
    return (
      <div className="editor" onClick={this.stopEdit}>
        <ul>{lines}</ul>
      </div>
    );
  }

  startEdit(editline){
    this.debug(`start edit line:${editline}`);
    store.dispatch({type: "editline", value: editline});
  }

  stopEdit(){
    this.debug(`stop edit`);
    store.dispatch({type: "editline", value: null});
  }

  onKeyDown(e){
    this.debug("keyCode = " + e.keyCode);
    switch(e.keyCode){
    case 13: // enter
      store.dispatch({type: "insertNewLine"});
      break;
    case 40: // down
      store.dispatch({type: "editline:down"});
      break;
    case 38: // up
      store.dispatch({type: "editline:up"});
      break;
    case 78: // ctrl + N
      if(e.ctrlKey) store.dispatch({type: "editline:down"});
      break;
    case 80:// ctrl + P
      if(e.ctrlKey) store.dispatch({type: "editline:up"});
      break;
    }
  }

}
