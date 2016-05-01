const debug = require("debug")("semirara:socket");

import SocketIO from "socket.io-client";
import {defaultRoute, parseRoute} from "../../share/route";
import page from "./page";
import pagelist from "./pagelist";
import title from "./title";

export const io = SocketIO();

io.on("connect", () => {
  debug("connect");
});

io.on("disconnect", () => {
  debug("disconnect");
});

export default function use({store, action}){

  page({io, store, action});
  pagelist({io, store, action});
  title({io, store, action});

  var popStateTimeout;
  window.addEventListener("popstate", (e) => {
    clearTimeout(popStateTimeout);
    popStateTimeout = setTimeout(() => {
      action.noPushStateRoute(Object.assign({}, defaultRoute, parseRoute()));
    }, 500);
  }, false);

  io.on("connect", () => {
    action.route(Object.assign({}, defaultRoute, parseRoute()));
  });

}
