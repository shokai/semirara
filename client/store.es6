import React from "react";
import {createStore} from "redux";
import reducer from "./reducer/";

const store = createStore(reducer, {user: window.user, app: window.app});

export function getStore(){
  return store;
}

export class Component extends React.Component{
  componentWillUnmount(){
    this.unsubscribeStore();
  }

  constructor(){
    super();
    this.state = store.getState();
    this.unsubscribeStore = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
}
