import React from "react";
import {bindActionCreators} from "redux";
import * as Actions from "../action/";
import Debug from "debug";

export default class StoreComponent extends React.Component{

  static get propTypes(){
    return {
      store: React.PropTypes.object.isRequired
    };
  }

  mapState(state){
    return state;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(Object.keys(nextProps).length !== Object.keys(this.props).length ||
       Object.keys(nextState).length !== Object.keys(this.state).length) return true;
    for(let k in nextState){
      if(typeof nextState[k] === "object" ||
         this.state[k] !== nextState[k]) return true;
    }
    for(let k in nextProps){
      if(k !== "store" &&
         typeof nextProps[k] === "object" ||
         this.props[k] !== nextProps[k]) return true;
    }
    this.debug("shouldNotComponentUpdate");
    return false;
  }

  componentWillUnmount(){
    this.debug("componentWillUnmount()");
    this.unsubscribeStore();
  }

  componentDidMount(){
    this.debug("componentDidMount()");
    this.unsubscribeStore = this.store.subscribe(() => {
      this.setState(this.mapState(this.store.getState()));
    });
  }

  componentWillMount(){
    this.debug("componentWillMount()");
    this.store = this.props.store;
    this.state = this.mapState(this.store.getState());
    this.action = bindActionCreators(Actions, this.store.dispatch);
  }

  constructor(){
    super();
    this.debug = Debug("semirara:component:" + this.constructor.name.toLowerCase());
    this.debug("constructor()");
  }

}
