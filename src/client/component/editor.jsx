import React from "react";
import StoreComponent from "./store-component";
import EditorLine from "./editor-line";
import {detectLang} from "./syntax";
import clone from "clone";
import {createCompiler} from "./syntax";

export default class Editor extends StoreComponent {

  constructor(){
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  componentWillMount(){
    super.componentWillMount();
    this.compiler = createCompiler({action: this.action, state: this.state});
  }

  mapState(state){
    return {page: state.page};
  }

  render(){
    this.debug("render()");
    const {page} = this.state;
    let lis;
    if(page.lines.length < 1 && !page.editline){
      lis = [(
        <li key={0}>
          <EditorLine compiler={this.compiler} line={{value: "(empty)"}} onStartEdit={() => this.action.setEditline(0)} />
        </li>
      )];
    }
    else{
      const lines = addLangToLines(page.lines);
      lis = Object.keys(lines).map(i => {
        i = parseInt(i);
        let line = lines[i];
        return (
          <li key={line.id || i} style={{marginLeft: line.indent*20}}>
            <EditorLine
               compiler={this.compiler}
               line={line}
               showUser={shouldShowUserIcon(lines, i)}
               edit={page.editline === i}
               onStartEdit={() => this.action.setEditline(i)}
               onChange={this.action.updateLine}
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
    const {action} = this;
    switch(e.keyCode){
    case 27: // escape
      action.unsetEditline();
      break;
    case 13: // enter
      action.insertNewLine();
      break;
    case 40: // down
      if(e.ctrlKey) action.swapLineDown();
      else if(e.shiftKey) action.swapBlockDown();
      else action.editlineDown();
      break;
    case 38: // up
      if(e.ctrlKey) action.swapLineUp();
      else if(e.shiftKey) action.swapBlockUp();
      else action.editlineUp();
      break;
    case 78: // ctrl + N
      if(e.ctrlKey) action.editlineDown();
      break;
    case 80:// ctrl + P
      if(e.ctrlKey) action.editlineUp();
      break;
    case 37: // left
      if(e.ctrlKey) action.indentDecrement();
      else if(e.shiftKey) action.indentBlockDecrement();
      break;
    case 39: // right
      if(e.ctrlKey) action.indentIncrement();
      else if(e.shiftKey) action.indentBlockIncrement();
      break;
    case 32: // space
      if(e.target.selectionStart !== 0 ||
         e.target.selectionEnd !== 0) break;
      e.preventDefault();
      action.indentIncrement();
      break;
    case 8: // backspace
      if(e.target.selectionStart !== 0 ||
         e.target.selectionEnd !== 0) break;
      e.preventDefault();
      action.indentDecrement();
      break;
    }
  }

  onPaste(e){
    const lines = e.clipboardData.getData("Text").split(/[\r\n]/);
    if(lines.length < 2) return;
    e.preventDefault();
    this.action.insertMultiLines(lines);
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


function detectCLI(str){
  const m = str.match(/^([\%\$]) (.+)/);
  if(m){
    const [, prefix, command] = m;
    return {prefix, command};
  }
  return false;
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
        line.cli = detectCLI(line.value);
      }
    }
  }
  return lines;
}
