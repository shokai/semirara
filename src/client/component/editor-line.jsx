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
      showUser: React.PropTypes.bool,
      edit: React.PropTypes.bool,
      onStartEdit: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func,
      onPaste: React.PropTypes.func
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
        let {lang, start} = line.codeblock;
        if(start){
          elm = <span className="codeblock-start">{getFullLanguage(lang) || lang}</span>;
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
