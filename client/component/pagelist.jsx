import React from "react";
import {Component, store} from "../store";
import classnames from "classnames";

export default class PageList extends Component {

  constructor(){
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(title){
    store.dispatch({type: "route", value: {title}});
  }

  render(){
    const list = this.state.pagelist.map((title) => {
      return (
        <li
           key={title}
           className={classnames({selected: title === this.state.page.title})}
           onClick={e => this.onItemClick(title)}
          >
          {title}
        </li>
      );
    });
    return (
      <div className="pagelist">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
