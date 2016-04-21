import {io} from "../socket";
import ioreq from "socket.io-request";
import {store} from "../store";
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

export const sendPage = store => next => action => {
  const targetActions = ["insertNewLine", "updateLine",
                         "swapLine:up", "swapLine:down",
                         "swapBlock:up", "swapBlock:down",
                         "indent:increment", "indent:decrement",
                         "indentBlock:increment", "indentBlock:decrement"];
  if(targetActions.indexOf(action.type) < 0) return next(action);
  const _lines = clone(store.getState().page.lines);
  const result = next(action);
  const {title, wiki, lines} = store.getState().page;
  if(lineChanged(_lines, lines)){
    io.emit("page:lines", {title, wiki, lines});
  }
  return result;
};

export const removeEmptyLines = store => next => action => {
  const result = next(action);
  const targetActions = ["editline:up", "editline:down"];
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

io.once("connect", () => {
  io.on("connect", async () => { // for next connect event
    const state = store.getState();
    const {wiki, title} = state.page;
    try{
      const page = await ioreq(io).request("getpage", {wiki, title});
      store.dispatch({type: "page", value: page});
    }
    catch(err){
      console.error(err.stack || err);
    }
  });
});

io.on("page:lines", (page) => {
  if(!page.lines) return;
  store.dispatch({type: "page:lines", value: page});
});


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
