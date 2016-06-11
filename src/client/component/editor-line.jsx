import React, {Component} from "react"
import {findDOMNode} from "react-dom"

import LongPress from "./longpress"
import UserIcon from "./usericon"
import Code, {getFullLanguage} from "./code"
import classnames from "classnames"

export default class EditorLine extends Component{

  constructor(){
    super()
    this.focusInput = this.focusInput.bind(this)
  }

  static get propTypes(){
    return {
      line: React.PropTypes.object.isRequired,
      compiler: React.PropTypes.func.isRequired,
      edit: React.PropTypes.bool,
      onStartEdit: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func,
      onPaste: React.PropTypes.func,
      key: React.PropTypes.string.isRequired
    }
  }

  render(){
    const {line, edit} = this.props
    const {codeblock, cli} = line
    if(edit) return this.renderEdit()
    if(codeblock) return this.renderCodeBlock()
    if(cli) return this.renderCli()
    return this.renderDefault()
  }

  renderEdit(){
    const {line, key} = this.props
    let input = (
      <input
         ref="input"
         value={line.value}
         onChange={e => this.props.onChange(e.target.value)}
        onClick={e => e.stopPropagation()}
        onKeyDown={this.props.onKeyDown}
        onPasteCapture={this.props.onPaste}
        />
    )
    if(line.blocktitle && !line.codeblock && !line.cli){
      input = <h3>{input}</h3>
    }
    return <li key={key} style={{marginLeft: line.indent*20}}>{input}</li>
  }

  renderCodeBlock(){
    const {line, key} = this.props
    const {lang, start, filename, indent} = line.codeblock
    if(start){
      return (
        <li key={key} style={{marginLeft: line.indent*20}}>
          <LongPress onLongPress={this.props.onStartEdit}>
            <span className="codeblock-start">{filename || getFullLanguage(lang) || lang}</span>
          </LongPress>
        </li>
      )
    }
    else{
      let className = classnames({
        codeblock: !line.codeblock.end,
        "codeblock-end": line.codeblock.end
      })
      return (
        <li key={key}>
          <LongPress onLongPress={this.props.onStartEdit}>
            <span className={className} style={{marginLeft: indent*20-5, paddingLeft: (line.indent-indent)*20+5}}>
              <Code lang={lang} code={line.value} />
            </span>
          </LongPress>
        </li>
      )
    }
  }

  renderCli(){
    const {key, line} = this.props
    return (
      <li key={key} style={{marginLeft: line.indent*20}}>
        <LongPress onLongPress={this.props.onStartEdit}>
          <span className="cli">
            <span className="prefix">{line.cli.prefix}</span>
            {" "}
            <span>{line.cli.command}</span>
          </span>
        </LongPress>
      </li>
    )
  }

  renderDefault(){
    const {key, line, compiler} = this.props
    const icon = line.showUserIcon ? <UserIcon id={line.user} size={20} /> : null
    let value = line.value
    if(line.numberList) value = line.numberList.prefix + value
    let elm = (
      <span>
        <LongPress onLongPress={this.props.onStartEdit}>
          {compiler(value)}
        </LongPress>
        {icon}
      </span>
    )
    if(line.blocktitle) elm = <h3>{elm}</h3>
    return (
      <li key={key} style={{marginLeft: line.indent*20}}>
        {elm}
      </li>
    )
  }

  componentDidUpdate(){
    this.focusInput()
  }

  componentDidMount(){
    this.focusInput()
  }

  focusInput(){
    if(!this.props.edit) return
    findDOMNode(this.refs.input).focus()
  }

}
