import React, {Component} from "react";

export default class UserIcon extends Component{

  static get propTypes(){
    return {
      id: React.PropTypes.string.isRequired,
      size: React.PropTypes.number.isRequired
    };
  }

  static get defaultProps(){
    return {
      size: 20
    };
  }

  get url(){
    return `https://avatars.githubusercontent.com/u/${this.props.id}?v=3&s=${this.props.size}`;
  }

  render(){
    return <img src={this.url} width={this.props.size} height={this.props.size} />;
  }
}
