import React from "react";
import StoreComponent from "./store-component";

import Login from "./login";

export default class Header extends StoreComponent{

  mapState(state){
    const {title} = state.page;
    return {title};
  }

  render(){
    const {store} = this.props;
    const {title} = this.state;
    return(
      <div className="header">
        <Login store={store} />
        <h1>{title}</h1>
      </div>
    );
  }
}
