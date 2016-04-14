import React from "react";
import {Component, getStore} from "../store";
const store = getStore();
import compile from "../syntax";

export default class Editor extends Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  mapState(state){
    return {page: state.page, user: state.user};
  }

  render(){
    this.debug("render()");
    const lines = this.state.page.lines.map((line) => {
      const __html = compile(line);
      return <li dangerouslySetInnerHTML={{__html}}></li>; // eslint-disable-line react/no-danger
    });
    return (
      <div className="editor">
        <h1>editor</h1>
        <ul>{lines}</ul>
        <textarea onChange={this.onChange} value={this.state.page.lines.join("\n")} />
      </div>
    );
  }

  onChange(e){
    store.dispatch({type: "page:lines", value: e.target.value.split(/[\r\n]/)});
  }

}
