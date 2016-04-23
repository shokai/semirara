import React from "react";
import {Component, store} from "../store";
import EditorLine from "./editorline";

export default class Editor extends Component {

  constructor(){
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  mapState(state){
    return {page: state.page};
  }

  render(){
    let lis;
    if(this.state.page.lines.length < 1 && !this.state.page.editline){
      lis = [(
        <li key={0}>
          <EditorLine value="(empty)" onStartEdit={() => store.dispatch({type: "editline", value: 0})} />
        </li>
      )];
    }
    else{
      lis = Object.keys(this.state.page.lines).map(i => {
        i = parseInt(i);
        let line = this.state.page.lines[i];
        return (
          <li key={line.id || i} style={{marginLeft: line.indent*20}}>
            <EditorLine
               value={line.value}
               user={shouldShowUserIcon(this.state.page.lines, i) ? line.user : null}
               edit={this.state.page.editline === i}
               onStartEdit={() => store.dispatch({type: "editline", value: i})}
               onChange={value => store.dispatch({type: "updateLine", value})}
               onKeyDown={e => this.onKeyDown(e)}
              />
          </li>
        );
      });
    }
    return (
      <div className="editor">
        <ul>{lis}</ul>
      </div>
    );
  }

  onKeyDown(e){
    switch(e.keyCode){
    case 13: // enter
      store.dispatch({type: "insertNewLine"});
      break;
    case 40: // down
      if(e.ctrlKey) store.dispatch({type: "swapLine:down"});
      else if(e.shiftKey) store.dispatch({type: "swapBlock:down"});
      else store.dispatch({type: "editline:down"});
      break;
    case 38: // up
      if(e.ctrlKey) store.dispatch({type: "swapLine:up"});
      else if(e.shiftKey) store.dispatch({type: "swapBlock:up"});
      else store.dispatch({type: "editline:up"});
      break;
    case 78: // ctrl + N
      if(e.ctrlKey) store.dispatch({type: "editline:down"});
      break;
    case 80:// ctrl + P
      if(e.ctrlKey) store.dispatch({type: "editline:up"});
      break;
    case 37: // left
      if(e.ctrlKey) store.dispatch({type: "indent:decrement"});
      else if(e.shiftKey) store.dispatch({type: "indentBlock:decrement"});
      break;
    case 39: // right
      if(e.ctrlKey) store.dispatch({type: "indent:increment"});
      else if(e.shiftKey) store.dispatch({type: "indentBlock:increment"});
      break;
    case 32: // space
      if(e.target.selectionStart !== 0 ||
         e.target.selectionEnd !== 0) break;
      e.preventDefault();
      store.dispatch({type: "indent:increment"});
      break;
    case 8: // backspace
      if(e.target.selectionStart !== 0 ||
         e.target.selectionEnd !== 0) break;
      e.preventDefault();
      store.dispatch({type: "indent:decrement"});
      break;
    }
  }

}

export function shouldShowUserIcon(lines, position){
  if(position < 1) return true;
  const currentLine = lines[position];
  const upperLine = lines[position-1];
  if(currentLine.user !== upperLine.user) return true;
  if(currentLine.indent < upperLine.indent) return true;
  return false;
}
