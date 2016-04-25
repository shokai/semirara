import React from "react";
import {Component, store} from "../store";
import EditorLine from "./editorline";
import {detectLang} from "./syntax";
import clone from "clone";

export default class Editor extends Component {

  constructor(){
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  mapState(state){
    return {page: state.page};
  }

  render(){
    let lis;
    if(this.state.page.lines.length < 1 && !this.state.page.editline){
      lis = [(
        <li key={0}>
          <EditorLine line={{value: "(empty)"}} onStartEdit={() => store.dispatch({type: "editline", value: 0})} />
        </li>
      )];
    }
    else{
      const lines = addLangToLines(this.state.page.lines);
      lis = Object.keys(lines).map(i => {
        i = parseInt(i);
        let line = lines[i];
        return (
          <li key={line.id || i} style={{marginLeft: line.indent*20}}>
            <EditorLine
               line={line}
               showUser={shouldShowUserIcon(lines, i)}
               edit={this.state.page.editline === i}
               onStartEdit={() => store.dispatch({type: "editline", value: i})}
               onChange={value => store.dispatch({type: "updateLine", value})}
               onKeyDown={this.onKeyDown}
               onPaste={this.onPaste}
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

  onPaste(e){
    const lines = e.clipboardData.getData("Text").split(/[\r\n]/);
    if(lines.length < 2) return;
    e.preventDefault();
    store.dispatch({type: "insertMultiLines", value: lines});
  }

}

export function shouldShowUserIcon(lines, position){
  if(position < 1) return true;
  const currentLine = lines[position];
  if(!currentLine.user) return false;
  for(let i = position-1; i >= 0; i--){
    let line = lines[i];
    if(line.indent <= currentLine.indent){
      if(line.user === currentLine.user) return false;
      if(line.user !== currentLine.user) return true;
    }
    if(line.indent < 1) break;
  }
  return true;
}

export function addLangToLines(_lines){
  const lines = clone(_lines);
  let lang, indent;
  for(let line of lines){
    if(lang && line.indent > indent){
      line.lang = lang;
    }
    else{
      line.lang = lang = detectLang(line.value);
      if(lang){
        indent = line.indent;
        line.codestart = true;
      }
      else{
        indent = null;
      }
    }
  }
  return lines;
}
