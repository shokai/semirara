import React from "react";
import {Component} from "../store";

export default class Login extends Component {

  mapState(state){
    return {user: state.user};
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.user &&
      this.state.user.name !== nextState.user.name;
  }

  render(){
    if(!this.state.user){
        return <ul><li><a href="/auth/login">login</a></li></ul>
      }
    else{
      return (
        <ul>
          <li><img src={this.state.user.icon+"&s=20"}></img></li>
          <li>{this.state.user.name}</li>
          <li><a href="/auth/logout">logout</a></li>
        </ul>
      );
    }
  }
}
