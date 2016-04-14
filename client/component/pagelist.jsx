import React from "react";
import {Component, getStore} from "../store";
const store = getStore();

export default class PageList extends Component {

  constructor(){
    super();
  }

  render(){
    const list = this.state.pagelist.map((title) => {
      return <li>{title}</li>;
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
