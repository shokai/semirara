const debug = require("debug")("semirara:socket");

import SocketIO from "socket.io-client";
import {defaultRoute, parseRoute} from "../../share/route";
import page from "./page";
import pagelist from "./pagelist";

export const io = SocketIO();

io.on("connect", () => {
  debug("connect");
});

io.on("disconnect", () => {
  debug("disconnect");
});

export default function use(store){

  page({io, store});
  pagelist({io, store});

  var popStateTimeout;
  window.addEventListener("popstate", (e) => {
    clearTimeout(popStateTimeout);
    popStateTimeout = setTimeout(() => {
      store.dispatch({
        type: "route",
        value: Object.assign({}, defaultRoute, parseRoute()),
        noPushState: true
      });
    }, 500);
  }, false);

  io.on("connect", () => {
    store.dispatch({
      type: "route",
      value: Object.assign({}, defaultRoute, parseRoute())
    });
  });

}
