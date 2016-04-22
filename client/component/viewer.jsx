import React from "react";
import {Component} from "../store";
import EditorLine from "./editorline";

export default class Viewer extends Component{

  mapState(state){
    return {page: state.page};
  }

  render(){
    const lis = this.state.page.lines.map(line => {
      return (
        <li style={{marginLeft: line.indent*20}}>
          <EditorLine
             value={line.value}
             user={line.user}
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
