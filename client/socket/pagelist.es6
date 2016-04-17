const debug = require("debug")("semirara:socket:pagelist");

import {store} from "../store";
import ioreq from "socket.io-request";

export default function pageListSocket(io){

  io.on("connect", async () => {
    const state = store.getState();
    const {wiki} = state.page;
    const titles = await ioreq(io).request("getpagelist", {wiki});
    store.dispatch({type: "pagelist", value: titles});
  });

  io.on("pagelist:add", (title) => {
    store.dispatch({type: "pagelist:add", value: title});
  });

  io.on("pagelist:remove", (title) => {
    store.dispatch({type: "pagelist:remove", value: title});
  });

}
