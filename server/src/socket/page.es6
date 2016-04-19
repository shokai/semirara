const debug = require("debug")("semirara:socket:page");

import ioreq from "socket.io-request";

import mongoose from "mongoose";
const Page = mongoose.model("Page");

import Room from "./room";

export default function use(app){

  const io = app.context.io;

  io.on("connection", (socket) => {
    const room = new Room(socket);

    socket.on("page:lines:diff", async (data) => {
      debug("page:lines:diff");
      debug(data);
      const {title, wiki, diff} = data;
      if(!title || !wiki || !diff) return;
      try{
        room.join(`${wiki}::${title}`);
        socket.broadcast.to(room.name).emit("page:lines:diff", {diff});
        const page = await Page.findOneAmbiguous({wiki, title}) || new Page({wiki, title});
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
        room.join(`${wiki}::${title}`);
        const page = await Page.findOneAmbiguous({wiki, title}) || new Page({wiki, title});
        res(page);
      }
      catch(err){
        console.error(err.stack || err);
      }
    });
  });
}

