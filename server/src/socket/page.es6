const debug = require("debug")("semirara:socket:page");

import {ambiguous} from "../model/";
import ioreq from "socket.io-request";

import mongoose from "mongoose";
const Page = mongoose.model("Page");

import Room from "./room";

export default function use(app){

  const io = app.context.io;

  io.on("connection", (socket) => {
    const room = new Room(socket);

    socket.on("page:lines", async (data) => {
      debug("page:lines");
      debug(data);
      const {title, wiki, lines} = data;
      if(!title || !wiki || !lines) return;
      try{
        room.join(`${wiki}::${title}`);
        socket.broadcast.to(room.name).emit("page:lines", {wiki, title, lines});
        await Page.findOneAndUpdate(
          ambiguous({wiki, title}),
          {wiki, title, lines},
          {upsert: true}
        );
      }
      catch(err){
        console.error(err.stack || err);
      }
    });

    ioreq(socket).response("getpage", async (req, res) => {
      const {wiki, title} = req;
      debug(`getpage ${wiki}::${title}`);
      try{
        room.join(`${wiki}::${title}`);
        const page = await Page.findOne(ambiguous({wiki, title})) || new Page({wiki, title});
        res(page);
      }
      catch(err){
        console.error(err.stack || err);
      }
    });
  });
}

