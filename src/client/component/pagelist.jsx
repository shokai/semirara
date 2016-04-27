import React from "react";
import StoreComponent from "./store-component";
import classnames from "classnames";

export default class PageList extends StoreComponent {

  constructor(){
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(title){
    this.action.route({title});
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
