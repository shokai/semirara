import React, {Component} from "react";
import ReactDOM from "react-dom";

import LongPress from "./longpress";
import compile from "../syntax";

export default class EditorLine extends Component{

  constructor(){
    super();
    this.focusInput = this.focusInput.bind(this);
  }

  static get propTypes(){
    return {
      value: React.PropTypes.string.isRequired,
      edit: React.PropTypes.bool,
      onStartEdit: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func
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
          />
      );
    }
    else{
      return (
        <LongPress onLongPress={this.props.onStartEdit}>
          {compile(this.props.value)}
        </LongPress>
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
