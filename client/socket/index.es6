const debug = require("debug")("semirara:socket");

import SocketIO from "socket.io-client";
export const io = SocketIO();

io.on("connect", () => {
  debug("connect");
});

io.on("disconnect", () => {
  debug("disconnect");
});
