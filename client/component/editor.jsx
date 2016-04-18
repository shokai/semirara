import React from "react";
import {Component, store} from "../store";
import compile from "../syntax";
import EditorLine from "./editorline";
import {clone} from "../../server/src/lib/diffpatch";

export default class Editor extends Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.updateLine = this.updateLine.bind(this);
    this.stopEdit = this.stopEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  mapState(state){
    return {page: state.page, user: state.user, editline: state.editor.editline};
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
             edit={this.state.editline === i}
             onStartEdit={() => this.startEdit(i)}
             onChange={value => this.updateLine(i, value)}
             onKeyDown={e => this.onKeyDown(e)}
             />
        </li>
      );
    });
    return (
      <div className="editor" onClick={this.stopEdit}>
        <h1>editor</h1>
        <ul>{lines}</ul>
        <textarea onChange={this.onChange} value={this.state.page.lines.join("\n")} />
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

  updateLine(linenum, value){
    store.dispatch({type: "updateLine", value, linenum});
  }

  onChange(e){
    store.dispatch({type: "page:lines", value: e.target.value.split(/[\r\n]/)});
  }

  onKeyDown(e){
    this.debug(e.keyCode);
    switch(e.keyCode){
    case 13: // enter
      store.dispatch({type: "insertNewLine", value: this.state.editline});
      break;
    case 40: // down
      if(this.state.editline < this.state.page.lines.length - 1){
        this.startEdit(this.state.editline + 1);
      }
      break;
    case 38: // up
      if(this.state.editline > 0){
        this.startEdit(this.state.editline - 1);
      }
      break;
    }
  }

}
