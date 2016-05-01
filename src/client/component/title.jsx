import React from "react";
import {findDOMNode} from "react-dom";

import StoreComponent from "./store-component";
import LongPress from "./longpress";

export default class Title extends StoreComponent{

  mapState(state){
    return state.page;
  }

  constructor(){
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render(){
    this.debug(this.state);
    const {title, newTitle} = this.state;
    if(typeof newTitle !== "string"){
      return (
        <LongPress onLongPress={this.action.startTitleEdit}><h1>{title}</h1></LongPress>
      );
    }
    else{
      return (
        <h1>
          <input
            ref="input"
            value={newTitle}
            onChange={e => this.action.changeTitle(e.target.value)}
            onKeyDown={this.onKeyDown}
            onClick={e => e.stopPropagation()}
            />
        </h1>
      );
    }
  }

  onKeyDown(e){
    if(e.keyCode === 13) this.action.submitTitle();
  }

  componentDidUpdate(){
    if(!this.state.newTitle) return;
    findDOMNode(this.refs.input).focus();
  }

}
