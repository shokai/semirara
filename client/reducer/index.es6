import {combineReducers} from "redux";
import page from "./page";
import pagelist from "./pagelist";
import editor from "./editor";

function echo(state = {}, action){
  return state;
}

export default combineReducers({page, pagelist, editor, user: echo});
