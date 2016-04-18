const debug = require("debug")("semirara:socket:pagelist");

import {store} from "../store";
import ioreq from "socket.io-request";

export default function pageListSocket(io){

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

}
