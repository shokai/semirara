import React from "react";
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer/";
import middlewares from "./middleware/";
import Line from "./line";
import Debug from "debug";

export const store = createStore(
  reducer,
  {
    user: window.user,
    page: {
      lines: [ new Line ],
      editline: null
    },
    pagelist: [ ]
  },
  applyMiddleware(...middlewares)
);

export class Component extends React.Component{

  mapState(state){
    return state;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(Object.keys(nextState).length !== Object.keys(this.state).length ||
       Object.keys(nextProps).length !== Object.keys(this.props).length){
      return true;
    }
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
