import React from "react";
import {Component} from "../store";
import compile from "../syntax";

export default class Viewer extends Component{

  mapState(state){
    return {page: state.page};
  }

  render(){
    const lis = this.state.page.lines.map(line => {
      return (
        <li style={{marginLeft: line.indent*20}}>{compile(line.value)}</li>
      );
    });
    return (
      <div className="editor">
        <ul>{lis}</ul>
      </div>
    );
  }
}
