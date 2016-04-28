import React, {Component} from "react";
import {findDOMNode} from "react-dom";

import LongPress from "./longpress";
import UserIcon from "./usericon";
import Code, {getFullLanguage} from "./code";

export default class EditorLine extends Component{

  constructor(){
    super();
    this.focusInput = this.focusInput.bind(this);
  }

  static get propTypes(){
    return {
      line: React.PropTypes.object.isRequired,
      compiler: React.PropTypes.func.isRequired,
      edit: React.PropTypes.bool.isRequired,
      onStartEdit: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
      onKeyDown: React.PropTypes.func.isRequired,
      onPaste: React.PropTypes.func.isRequired
    };
  }

  render(){
    const {line, compiler} = this.props;
    if(this.props.edit){
      return (
        <input
           ref="input"
           value={line.value}
           onChange={e => this.props.onChange(e.target.value)}
           onClick={e => e.stopPropagation()}
           onKeyDown={this.props.onKeyDown}
           onPasteCapture={this.props.onPaste}
          />
      );
    }
    else{
      const icon = line.showUserIcon ? <UserIcon id={line.user} size={20} /> : null;
      let elm;
      if(line.codeblock){
        let {lang, start, filename} = line.codeblock;
        if(start){
          elm = <span className="codeblock-start">{filename || getFullLanguage(lang) || lang}</span>;
        }
        else{
          elm = <Code lang={lang} code={line.value} />;
        }
      }
      else if(line.cli){
        elm = (
          <span className="cli">
            <span className="prefix">{line.cli.prefix}</span>
            {" "}
            <span>{line.cli.command}</span>
          </span>
        );
      }
      else{ // normal line
        elm = compiler(line.value);
      }
      return (
        <span>
          <LongPress onLongPress={this.props.onStartEdit}>
            {elm}
          </LongPress>
          {icon}
        </span>
      );
    }
  }

  componentDidUpdate(){
    this.focusInput();
  }

  componentDidMount(){
    this.focusInput();
  }

  focusInput(){
    if(!this.props.edit) return;
    findDOMNode(this.refs.input).focus();
  }

}
