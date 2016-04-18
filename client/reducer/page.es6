import {diffpatch, clone} from "../../server/src/lib/diffpatch";

export default function pageReducer(state = {}, action){
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
  case "updateLine":
    state.lines[action.linenum] = action.value;
    break;
  case "insertNewLine":
    if(state.editline > -1){
      const topLines = state.lines.splice(0, state.editline+1);
      state.lines = [...topLines, "", ...state.lines];
      state.editline += 1;
    }
    break;
  case "editline":
    state.editline = action.value;
    if(!state.editline) state.lines = state.lines.filter(i => i.length > 0);
    break;
  case "editline:up":
    if(state.editline > 0){
      state.editline -= 1;
      state.lines = state.lines.filter(i => i.length > 0);
    }
    break;
  case "editline:down":
    if(state.editline < state.lines.length-1){
      state.editline += 1;
      state.lines = state.lines.filter(i => i.length > 0);
    }
    break;
  }
  return state;
}
