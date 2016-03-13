import React from "react";
import {createStore} from "redux";
import reducer from "./reducer/";
import Debug from "debug";

const store = createStore(reducer, {user: window.user, app: window.app});

export function getStore(){
  return store;
}

export class Component extends React.Component{

  componentWillUnmount(){
    this.debug("componentWillUnmount()");
    this.unsubscribeStore();
  }

  componentDidMount(){
    this.debug("componentDidMount()");
    this.unsubscribeStore = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  constructor(){
    super();
    this.debug = Debug("semirara:component:" + this.constructor.name.toLowerCase());
    this.debug("constructor()");
    this.state = store.getState();
  }
}
