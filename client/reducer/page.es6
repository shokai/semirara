import {diffpatch, clone} from "../../server/src/lib/diffpatch";

export default function pageReducer(state = {}, action){
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
    state.lines = action.value;
    break;
  case "page:lines:patch":
    state.lines = diffpatch.patch(clone(state.lines), action.value);
    break;
  }
  return state;
}
