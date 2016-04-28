import {io} from "../socket";
import ioreq from "socket.io-request";
import clone from "clone";

export const getPageOnRoute = store => next => async (action) => {
  if(action.type !== "route") return next(action);
  const result = next(action);
  const {title, wiki} = store.getState().page;
  try{
    const page = await ioreq(io).request("getpage", {wiki, title});
    store.dispatch({type: "page", value: page});
  }
  catch(err){
    console.error(err.stack || err);
  }
  return result;
};

var _sendingPage = false;
var _nextSendPageData = null;
function _sendPage({title, wiki, lines}){
  if(!title || !wiki || !lines) return;
  if(!_sendingPage){
    _nextSendPageData = null;
    _sendingPage = true;
    io.emit("page:lines", {title, wiki, lines}, ({error, success}) => {
      _sendingPage = false;
      if(_nextSendPageData){
        _sendPage(_nextSendPageData);
      }
    });
  }
  else{
    _nextSendPageData = {title, wiki, lines};
  }
}

export const sendPage = store => next => action => {
  const targetActions = ["insertNewLine", "updateLine", "insertMultiLines",
                         "swapLine:up", "swapLine:down",
                         "swapBlock:up", "swapBlock:down",
                         "indent:increment", "indent:decrement",
                         "indentBlock:increment", "indentBlock:decrement"];
  if(targetActions.indexOf(action.type) < 0) return next(action);
  const _lines = clone(store.getState().page.lines);
  const result = next(action);
  const {title, wiki, lines} = store.getState().page;
  if(lineChanged(_lines, lines)){
    _sendPage({title, wiki, lines});
  }
  return result;
};

export const removeEmptyLines = store => next => action => {
  const result = next(action);
  const targetActions = ["editline:up", "editline:down", "insertMultiLines"];
  if((action.type === "editline" && action.value === null) ||
     targetActions.indexOf(action.type) > -1){
    store.dispatch({type: "removeEmptyLines"});
  }
  return result;
};

export const unsetEditLineOnRoute = store => next => action => {
  if(action.type !== "route") return next(action);
  const result = next(action);
  store.dispatch({type: "editline", value: null});
  return result;
};

export const adjustEditLineOnPageLines = store => next => action => {
  if(action.type !== "page:lines") return next(action);
  const _state = store.getState();
  const _editline = _state.page.editline;
  if(!_editline) return next(action);
  const id = _state.page.lines[_editline].id;
  const result = next(action);
  if(!id) return result;
  const state = store.getState();
  let editline;
  for(let i = 0; i < state.page.lines.length; i++){
    let line = state.page.lines[i];
    if(line.id === id){
      editline = i;
      break;
    }
  }
  if(!editline) return result;
  if(editline !== _editline) store.dispatch({type: "editline", value: editline});
  return result;
};


function lineChanged(lineA, lineB){
  if(lineA.length !== lineB.length) return true;
  for(let i = 0; i < lineA.length; i++){
    let a = lineA[i];
    let b = lineB[i];
    if(a.value !== b.value ||
       a.indent !== b.indent) return true;
  }
  return false;
}
