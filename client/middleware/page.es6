import {io} from "../socket/";
import ioreq from "socket.io-request";
import {diffpatch, clone} from "../../server/src/lib/diffpatch";

export const getPageOnRoute = store => next => async (action) => {
  if(action.type !== "route") return next(action);
  const result = next(action);
  const {title, wiki} = store.getState().page;
  console.log({title, wiki});
  try{
    const page = await ioreq(io).request("getpage", {wiki, title});
    store.dispatch({type: "page", value: page});
  }
  catch(err){
    console.error(err.stack || err);
  }
  return result;
};

export const sendPageDiff = store => next => action => {
  if(action.type !== "page:lines") return next(action);
  const _lines = clone(store.getState().page.lines);
  const result = next(action);
  const diff = diffpatch.diff(_lines, action.value);
  if(diff){
    const {title, wiki} = store.getState().page;
    io.emit("page:lines:diff", {title, wiki, diff});
  }
  return result;
};
