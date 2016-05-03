import React from "react";
import StoreComponent from "./store-component";
import EditorLine from "./editor-line";
import {createCompiler} from "./syntax/markup";
import {decorateLines} from "./syntax/decorator";

export default class Editor extends StoreComponent {

  constructor(){
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  componentWillMount(){
    super.componentWillMount();
  }

  mapState(state){
    return {page: state.page};
  }

  render(){
    this.debug("render()");
    const compiler = createCompiler({action: this.action, state: this.state});
    const {page} = this.state;
    let lis;
    if(page.lines.length < 1 && !page.editline){
      lis = [(
        <li key={0}>
          <EditorLine compiler={compiler} line={{value: "(empty)"}} onStartEdit={() => this.action.setEditline(0)} />
        </li>
      )];
    }
    else{
      const lines = decorateLines(page.lines);
      lis = Object.keys(lines).map(i => {
        i = parseInt(i);
        let line = lines[i];
        let editlineElm =
              <EditorLine
                compiler={compiler}
                line={line}
                edit={page.editline === i}
                onStartEdit={() => this.action.setEditline(i)}
                onChange={this.action.updateLine}
                onKeyDown={this.onKeyDown}
                onPaste={this.onPaste} />;
        if(line.blocktitle) editlineElm = <h3>{editlineElm}</h3>;
        return (
          <li key={line.id || i} style={{marginLeft: line.indent*20}}>
            {editlineElm}
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
