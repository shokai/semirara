import React from "react";
import {Component} from "../store";
import EditorLine from "./editorline";
import {shouldShowUserIcon} from "./editor";

export default class Viewer extends Component{

  mapState(state){
    return {page: state.page};
  }

  render(){
    const lis = Object.keys(this.state.page.lines).map(i => {
      const line = this.state.page.lines[i];
      return (
        <li key={line.id || i} style={{marginLeft: line.indent*20}}>
          <EditorLine
             value={line.value}
             user={shouldShowUserIcon(this.state.page.lines, i) ? line.user : null}
             />
        </li>
      );
    });
    return (
      <div className="editor">
        <ul>{lis}</ul>
      </div>
    );
  }
}
