import React from "react";
import StoreComponent from "./store-component";
import "date-utils";

export default class PageDate extends StoreComponent{

  mapState(state){
    return state.page;
  }

  render(){
    let {createdAt, updatedAt} = this.state;
    if(!createdAt || !updatedAt) return null;
    createdAt = new Date(createdAt).toFormat("YYYY/MM/DD");
    updatedAt = new Date(updatedAt).toFormat("YYYY/MM/DD");
    let dateStr = createdAt === updatedAt ? `${createdAt}` : `${createdAt}〜${updatedAt}`;
    return (
      <div className="page-date">{`(${dateStr})`}</div>
    );
  }
}
