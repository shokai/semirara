import React from "react";
import {Component, store} from "../store";

export default class PageList extends Component {

  constructor(){
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(e){
    const title = e.target.attributes.title.value;
    if(!title) return;
    store.dispatch({type: "route", value: {title}});
  }

  render(){
    const list = this.state.pagelist.map((title) => {
      return <li key={title} onClick={this.onItemClick} title={title}>{title}</li>;
    });
    return (
      <div className="pagelist">
        <h2>pagelist</h2>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
