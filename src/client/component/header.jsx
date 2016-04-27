import React from "react";
import StoreComponent from "./store-component";

import Login from "./login";

export default class Header extends StoreComponent{

  mapState(state){
    const {wiki, title} = state.page;
    return {wiki, title};
  }

  render(){
    return(
      <div>
        <Login />
        <h1>{this.state.wiki}::{this.state.title}</h1>
      </div>
    );
  }
}
