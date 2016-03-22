import React from "react";
import {createStore} from "redux";
import reducer from "./reducer/";
import Debug from "debug";

const store = createStore(reducer, {
  user: window.user,
  app: window.app,
  page: {
    lines: [ "" ]
  }
});

export function getStore(){
  return store;
}

export class Component extends React.Component{

  mapState(state){
    return state;
  }

  shouldComponentUpdate(nextProps, nextState){
    for(let k in nextState){
      if(typeof nextState[k] === "object" ||
         this.state[k] !== nextState[k]) return true;
    }
    for(let k in nextProps){
      if(typeof nextProps[k] === "object" ||
         this.props[k] !== nextProps[k]) return true;
    }
    return false;
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
