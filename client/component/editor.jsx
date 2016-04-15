import React from "react";
import {Component, getStore} from "../store";
const store = getStore();
import compile from "../syntax";

export default class Editor extends Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.editline = this.editline.bind(this);
  }

  mapState(state){
    return {page: state.page, user: state.user, editline: null};
  }

  render(){
    this.debug("render()");
    let i = 0;
    const lines = [];
    for(let i = 0; i < this.state.page.lines.length; i++){
      const line = this.state.page.lines[i];
      const onClick = (e) => {
        e.stopPropagation();
        this.editline(i);
      };
      let li;
      if(i === this.state.editline){
        li = <li key={i}><input value={line} /></li>;
      }
      else{
        li = <li key={i}><span onClick={onClick}>{compile(line)}</span></li>;
      }
      lines.push(li);
    }
    return (
      <div className="editor" onClick={this.editline}>
        <h1>editor</h1>
        <ul>{lines}</ul>
        <textarea onChange={this.onChange} value={this.state.page.lines.join("\n")} />
      </div>
    );
  }

  onLineClick(e){
    this.debug(e.target);
    const editline = e.target.attributes.num.value;
    this.debug(editline);
    this.setState({editline});
  }

  editline(editline){
    if(typeof editline !== "number") editline = null;
    this.debug(`set editline ${editline}`);
    this.setState({editline});
  }

  onChange(e){
    store.dispatch({type: "page:lines", value: e.target.value.split(/[\r\n]/)});
  }

}
