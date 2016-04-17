const debug = require("debug")("semirara:socket");

import SocketIO from "socket.io-client";

import page from "./page";
import pagelist from "./pagelist";

export const io = SocketIO();

page(io);
pagelist(io);

io.on("connect", () => {
  debug("connect");
});

io.on("disconnect", () => {
  debug("disconnect");
});
