const debug = require("debug")("semirara:socket:list");

import ioreq from "socket.io-request";
import WikiRoom from "./wikiroom";
import mongoose from "mongoose";
const Page = mongoose.model("Page");

export function use(app){

  const io = app.context.io;

  io.on("connection", (socket) => {

    const wikiRoom = new WikiRoom(socket);

    socket.on("disconnect", () => {
      Page.removeListener("add", onPageAdd);
      Page.removeListener("remove", onPageRemove);
    });

    ioreq(socket).response("getlist", async (req, res) => {
      const {wiki} = req;
      wikiRoom.join(wiki);
      try{
        const pages = await Page.find({wiki}, 'title');
        res(pages);
      }
      catch(err){
        console.error(err.stack || err);
      }
    });

    const onPageAdd = (page) => {
      debug("add page");
      debug(page);
    };

    const onPageRemove = (page) => {
      debug("remove page");
      debug(page);
    };

    Page.on("add", onPageAdd);
    Page.on("remove", onPageRemove);

  });

}
