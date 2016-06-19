import React from "react"
import StoreComponent from "./store-component"
import EditorLine from "./editor-line"
import {createCompiler} from "./syntax/markup"
import {decorateLines} from "./syntax/decorator"
import {range} from 'lodash'

export default class Editor extends StoreComponent {

  constructor(){
    super()
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onPaste = this.onPaste.bind(this)
  }

  componentWillMount(){
    super.componentWillMount()
  }

  mapState(state){
    return {page: state.page}
  }

  render(){
    this.debug("render()")
    const compiler = createCompiler({action: this.action, state: this.state})
    const {page} = this.state
    let lis
    if(page.lines.length < 1 && !page.editline){
      lis = [(
        <EditorLine key={0} compiler={compiler} line={{value: "(empty)"}} onStartEdit={() => this.action.setEditline(0)} />
      )]
    }
    else{
      const lines = decorateLines(page.lines)
      lis = range(0, lines.length).map(i => {
        let line = lines[i]
        return (
          <EditorLine
             compiler={compiler}
             line={line}
             edit={page.editline === i}
             onStartEdit={() => this.action.setEditline(i)}
             onChange={this.action.updateLine}
             onKeyDown={this.onKeyDown}
             onPaste={this.onPaste} />
        )
      })
    }
    return (
      <div className="editor">
        <ul>{lis}</ul>
      </div>
    )
  }

  onKeyDown(e){
    const {action} = this
    switch(e.keyCode){
      case 27: // escape
        action.unsetEditline()
        break
      case 13: // enter
        action.insertNewLine()
        break
      case 40: // down
        if(e.ctrlKey) action.swapLineDown()
        else if(e.shiftKey) action.swapBlockDown()
        else action.editlineDown()
        break
      case 38: // up
        if(e.ctrlKey) action.swapLineUp()
        else if(e.shiftKey) action.swapBlockUp()
        else action.editlineUp()
        break
      case 78: // ctrl + N
        if(e.ctrlKey) action.editlineDown()
        break
      case 80:// ctrl + P
        if(e.ctrlKey) action.editlineUp()
        break
      case 37: // left
        if(e.ctrlKey) action.indentDecrement()
        else if(e.shiftKey) action.indentBlockDecrement()
        break
      case 39: // right
        if(e.ctrlKey) action.indentIncrement()
        else if(e.shiftKey) action.indentBlockIncrement()
        break
      case 32: // space
        if(e.target.selectionStart !== 0 ||
           e.target.selectionEnd !== 0) break
        e.preventDefault()
        action.indentIncrement()
        break
      case 8: // backspace
        if(e.target.selectionStart !== 0 ||
           e.target.selectionEnd !== 0) break
        e.preventDefault()
        action.indentDecrement()
        break
    }
  }

  onPaste(e){
    const lines = e.clipboardData.getData("Text").split(/[\r\n]/)
    if(lines.length < 2) return
    e.preventDefault()
    this.action.insertMultiLines(lines)
  }

}
