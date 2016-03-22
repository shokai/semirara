const debug = require("debug")("semirara:reducer:page");

import {diffpatch, clone} from "../../lib/diffpatch";

export default function pageReducer(state = {}, action){
  debug(`action.type = ${action.type}`);
  delete state.diff;
  switch(action.type){
  case "route":
    if(action.value.wiki) state.wiki = action.value.wiki;
    if(action.value.title) state.title = action.value.title;
    break;
  case "page":
    state = action.value;
    break;
  case "page:lines":
    state.diff = diffpatch.diff(state.lines, action.value);
    state.lines = action.value;
    break;
  case "page:lines:patch":
    state.lines = diffpatch.patch(clone(state.lines), action.value);
    break;
  }
  debug(state);
  return state;
}
