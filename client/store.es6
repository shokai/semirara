import React from "react";
import {createStore} from "redux";
import reducer from "./reducer/";
import Debug from "debug";

const store = createStore(reducer, {
  user: window.user,
  app: window.app,
  page: {
    text: ""
  }
});

export function getStore(){
  return store;
}

export class Component extends React.Component{

  mapState(state){
    return state;
  }

  componentWillUnmount(){
    this.debug("componentWillUnmount()");
    this.unsubscribeStore();
  }

  componentDidMount(){
    this.debug("componentDidMount()");
    this.unsubscribeStore = store.subscribe(() => {
      this.setState(this.mapState(store.getState()));
    });
  }

  constructor(){
    super();
    this.debug = Debug("semirara:component:" + this.constructor.name.toLowerCase());
    this.debug("constructor()");
    this.state = this.mapState(store.getState());
  }
}
