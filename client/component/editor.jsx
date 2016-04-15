import React from "react";
import {Component, getStore} from "../store";
const store = getStore();
import compile from "../syntax";

export default class Editor extends Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.stopEdit = this.stopEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
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
      const startEdit = (e) => {
        e.stopPropagation();
        this.startEdit(i);
      };

      let li;
      if(i === this.state.editline){
        li = <li key={i}><input value={line} onClick={e => e.stopPropagation()} /></li>;
      }
      else{
        li = <li key={i}><span onClick={startEdit}>{compile(line)}</span></li>;
      }
      lines.push(li);
    }
    return (
      <div className="editor" onClick={this.stopEdit}>
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

  stopEdit(){
    this.debug(`stop edit`);
    this.setState({editline: null});
  }

  startEdit(editline){
    this.debug(`start edit line:${editline}`);
    this.setState({editline});
  }

  onChange(e){
    store.dispatch({type: "page:lines", value: e.target.value.split(/[\r\n]/)});
  }

}
