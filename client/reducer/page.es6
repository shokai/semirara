import clone from "clone";
import {diffpatch} from "../../server/src/lib/diffpatch";
import Line from "../line";

export default function pageReducer(state = {}, action){
  switch(action.type){
  case "route":
    if(action.value.wiki) state.wiki = action.value.wiki;
    if(action.value.title) state.title = action.value.title;
    break;
  case "page":
    state = action.value;
    break;
  case "page:lines:patch":
    state.lines = diffpatch.patch(clone(state.lines), action.value);
    break;
  case "updateLine":
    state.lines[state.editline].value = action.value;
    break;
  case "insertNewLine":
    if(state.editline > -1){
      const topLines = state.lines.splice(0, state.editline+1);
      state.lines = [...topLines, new Line, ...state.lines];
      state.editline += 1;
    }
    break;
  case "removeEmptyLines": {
    const lines = [];
    let upCount = 0;
    for(let i = 0; i < state.lines.length; i++){
      if(/^\s*$/.test(state.lines[i].value)){ // empty line
        if(i <= state.editline) upCount += 1;
      }
      else{
        lines.push(state.lines[i]);
      }
    }
    state.lines = lines;
    if(state.editline) state.editline -= upCount;
    break;
  }
  case "editline":
    state.editline = action.value;
    if(state.editline === 0 && state.lines.length === 0){ // empty page
      state.lines = [ new Line ];
    }
    break;
  case "editline:up":
    if(state.editline > 0) state.editline -= 1;
    break;
  case "editline:down":
    if(state.editline < state.lines.length-1) state.editline += 1;
    break;
  case "swapline:up":
    if(state.editline > 0){
      let currentLine = state.lines[state.editline];
      state.lines[state.editline] = state.lines[state.editline-1];
      state.lines[state.editline-1] = currentLine;
      state.editline -= 1;
    }
    break;
  case "swapline:down":
    if(state.editline < state.lines.length-1){
      let currentLine = state.lines[state.editline];
      state.lines[state.editline] = state.lines[state.editline+1];
      state.lines[state.editline+1] = currentLine;
      state.editline += 1;
    }
    break;
  case "indent:decrement":{
    let currentLine = state.lines[state.editline];
    if(currentLine.indent > 0) currentLine.indent -= 1;
    break;
  }
  case "indent:increment":
    state.lines[state.editline].indent += 1;
    break;
  }
  return state;
}
