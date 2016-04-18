import {io} from "../socket/";
import ioreq from "socket.io-request";
import {store} from "../store";

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

io.once("connect", () => {
  io.on("connect", async () => { // for next connect event
    const {wiki} = store.getState().page;
    const pagelist = await ioreq(io).request("getpagelist", {wiki});
    store.dispatch({type: "pagelist", value: pagelist});
  });
});

io.on("pagelist:add", (title) => {
  store.dispatch({type: "pagelist:add", value: title});
});

io.on("pagelist:remove", (title) => {
  store.dispatch({type: "pagelist:remove", value: title});
});
