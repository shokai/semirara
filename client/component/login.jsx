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
    let element;
    if(!this.state.user){
      element = <ul><li><span><a href="/auth/login">login</a></span></li></ul>;
    }
    else{
      element = (
        <ul>
          <li><span><a href={"https://github.com/"+this.state.user.name}>
                <img src={this.state.user.icon+"&s=20"} />{this.state.user.name}
          </a></span></li>
          <li><span><a href="/auth/logout">logout</a></span></li>
        </ul>
      );
    }
    return (
      <div className="login">{element}</div>
    );
  }
}
