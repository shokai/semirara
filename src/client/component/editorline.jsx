import React, {Component} from "react";
import ReactDOM from "react-dom";

import LongPress from "./longpress";
import compile from "./syntax";
import UserIcon from "./usericon";
import Code from "./code";

export default class EditorLine extends Component{

  constructor(){
    super();
    this.focusInput = this.focusInput.bind(this);
  }

  static get propTypes(){
    return {
      value: React.PropTypes.string.isRequired,
      user: React.PropTypes.number,
      edit: React.PropTypes.bool,
      lang: React.PropTypes.string,
      onStartEdit: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func,
      onPaste: React.PropTypes.func
    };
  }

  render(){
    if(this.props.edit){
      return (
        <input
           ref="input"
           value={this.props.value}
           onChange={e => this.props.onChange(e.target.value)}
           onClick={e => e.stopPropagation()}
           onKeyDown={this.props.onKeyDown}
           onPasteCapture={this.props.onPaste}
          />
      );
    }
    else{
      const icon = !this.props.user ? null : <UserIcon id={this.props.user} size={20} />;
      let elm = this.props.lang ?
            <Code lang={this.props.lang} code={this.props.value} /> :
            compile(this.props.value);
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
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

}
