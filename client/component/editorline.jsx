import React, {Component} from "react";
import compile from "../syntax";

export default class EditorLine extends Component{
  static get propTypes(){
    return {
      value: React.PropTypes.string.isRequired,
      edit: React.PropTypes.bool.isRequired,
      onStartEdit: React.PropTypes.func,
      onValueChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func
    };
  }

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  render(){
    if(this.props.edit){
      return (
        <input
           onClick={e => e.stopPropagation()}
           onChange={this.onChange}
           onKeyDown={this.props.onKeyDown}
           value={this.props.value} />
      );
    }
    else{
      return <span onClick={this.props.onStartEdit}>{compile(this.props.value)}</span>;
    }
  }

  onChange(e){
    this.props.onValueChange(e.target.value);
  }

}
