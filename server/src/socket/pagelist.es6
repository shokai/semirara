const debug = require("debug")("semirara:socket:pagelist");

import ioreq from "socket.io-request";
import Room from "./room";
import mongoose from "mongoose";
const Page = mongoose.model("Page");

export default function use(app){

  const io = app.context.io;

  io.on("connection", (socket) => {

    const room = new Room(socket);

    ioreq(socket).response("getpagelist", async (req, res) => {
      const {wiki} = req;
      room.join(wiki);
      try{
        const pages = await Page.find({wiki}, 'title', {sort: {updatedAt: -1}});
        res(pages.map(i => i.title));
      }
      catch(err){
        console.error(err.stack || err);
      }
    });

  });

  Page.on("update", (page) => {
    const {wiki, title} = page;
    debug(`update ${wiki}::${title}`);
    io.to(wiki).emit("pagelist:update", title);
  });

  Page.on("remove", (page) => {
    const {wiki, title} = page;
    debug(`remove ${wiki}::${title}`);
    io.to(wiki).emit("pagelist:remove", title);
  });
}
