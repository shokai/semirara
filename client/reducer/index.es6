import {combineReducers} from "redux";
import page from "./page";
import pagelist from "./pagelist";

function echo(state = {}, action){
  return state;
}

export default combineReducers({page, pagelist, user: echo});
