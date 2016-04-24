import React from "react";
import {Component} from "../store";
import EditorLine from "./editorline";
import {shouldShowUserIcon, addLangToLines} from "./editor";

export default class Viewer extends Component{

  mapState(state){
    return {page: state.page};
  }

  render(){
    const lines = addLangToLines(this.state.page.lines);
    const lis = Object.keys(this.state.page.lines).map(i => {
      const line = lines[i];
      return (
        <li key={line.id || i} style={{marginLeft: line.indent*20}}>
          <EditorLine
             value={line.value}
             user={shouldShowUserIcon(lines, i) ? line.user : null}
             lang={line.lang}
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
