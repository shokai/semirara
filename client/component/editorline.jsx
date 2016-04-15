import React, {Component} from "react";
import ReactDOM from "react-dom";

import compile from "../syntax";

export default class EditorLine extends Component{
  static get propTypes(){
    return {
      value: React.PropTypes.string.isRequired,
      edit: React.PropTypes.bool.isRequired,
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
           onClick={e => e.stopPropagation()}
           onChange={e => this.props.onChange(e.target.value)}
           onKeyDown={this.props.onKeyDown}
           value={this.props.value} />
      );
    }
    else{
      return <span onClick={this.props.onStartEdit}>{compile(this.props.value)}</span>;
    }
  }

  componentDidUpdate(){
    if(!this.props.edit) return;
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

}
