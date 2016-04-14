const debug = require("debug")("semirara:socket");

import SocketIO from "socket.io-client";
import {getStore} from "../store";
const store = getStore();

import ioreq from "socket.io-request";

const io = SocketIO();

io.on("connect", async () => {
  debug("connect");
  const state = store.getState();
  const {wiki, title} = state.page;
  const page = await ioreq(io).request("getpage", {wiki, title});
  store.dispatch({type: "page", value: page});
  const titles = await ioreq(io).request("getpagelist", {wiki});
  store.dispatch({type: "pagelist", value: titles});
});

io.on("disconnect", () => {
  debug("disconnect");
});

io.on("page:lines:diff", (page) => {
  debug(page);
  if(!page.diff) return;
  store.dispatch({type: "page:lines:patch", value: page.diff});
});

store.subscribe(() => {
  const state = store.getState();
  const {title, wiki, diff} = state.page;
  if(!diff) return;
  io.emit("page:lines:diff", {title, wiki, diff});
});

let lastTitle, lastWiki;
store.subscribe(async () => {
  const state = store.getState();
  const {title, wiki} = state.page;
  if(lastTitle === title && lastWiki === wiki) return;
  lastTitle = title;
  lastWiki = wiki;
  const page = await ioreq(io).request("getpage", {wiki, title});
  store.dispatch({type: "page", value: page});
});

io.on("pagelist:add", (title) => {
  store.dispatch({type: "pagelist:add", value: title});
});

io.on("pagelist:remove", (title) => {
  store.dispatch({type: "pagelist:remove", value: title});
});
