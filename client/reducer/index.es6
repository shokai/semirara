import {combineReducers} from "redux";
import page from "./page";

function echo(state = {}, action){
  return state;
}

export default combineReducers({page, user: echo, app: echo});
