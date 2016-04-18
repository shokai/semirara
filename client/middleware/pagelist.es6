import {io} from "../socket/";
import ioreq from "socket.io-request";

export const getPageListOnRoute = store => next => async (action) => {
  if(action.type !== "route") return next(action);
  const _wiki = store.getState().page.wiki;
  const result = next(action);
  const {wiki} = store.getState().page;
  if(wiki !== _wiki){
    const pagelist = await ioreq(io).request("getpagelist", {wiki});
    store.dispatch({type: "pagelist", value: pagelist});
  }
  return result;
};
