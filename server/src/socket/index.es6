const debug = require("debug")("semirara:socket");

import ioreq from "socket.io-request";

import mongoose from "mongoose";
const Page = mongoose.model("Page");

import PageRoom from "./pageroom";

export function use(app){

  const io = app.context.io;

  io.on("connection", (socket) => {
    const pageRoom = new PageRoom(socket);

    socket.on("disconnect", () => {
      pageRoom.leave();
    });

    socket.on("page:lines:diff", async (data) => {
      debug("page:lines:diff");
      debug(data);
      const {title, wiki, diff} = data;
      if(!title || !wiki || !diff) return;
      try{
        pageRoom.join({title, wiki});
        socket.broadcast.to(pageRoom.name).emit("page:lines:diff", {diff});
        const page = await Page.findOne({wiki, title}) || new Page({wiki, title});
        page.patchLines(diff);
        page.save();
      }
      catch(err){
        console.error(err.stack || err);
      }
    });

    ioreq(socket).response("getpage", async (req, res) => {
      const {wiki, title} = req;
      try{
        pageRoom.join({title, wiki});
        const page = await Page.findOne({wiki, title}) || new Page({wiki, title});
        res(page);
      }
      catch(err){
        console.error(err.stack || err);
      }
    })
  });
}
