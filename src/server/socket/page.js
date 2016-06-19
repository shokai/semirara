const debug = require("../../share/debug")(__filename)

import {ambiguous} from "../model/"
import ioreq from "socket.io-request"

import mongoose from "mongoose"
const Page = mongoose.model("Page")

import Room from "./room"

export default function use(app){

  const io = app.context.io

  io.on("connection", (socket) => {
    const room = new Room(socket)

    ioreq(socket).response("getpage", async (req, res) => {
      const {wiki, title} = req
      debug(`getpage ${wiki}::${title}`)
      try{
        room.join(`${wiki}::${title}`)
        const page = await Page.findOneByWikiTitle({wiki, title}) || new Page({wiki, title})
        res(page)
      }
      catch(err){
        console.error(err.stack || err)
      }
    })

    if(!socket.user) return

    // for Authorized User
    socket.on("page:lines", async (data, ack) => {
      debug("page:lines")
      const {title, wiki, lines} = data
      if(!title || !wiki || !lines) return ack({error: "prop incorrect"})
      try{
        room.join(`${wiki}::${title}`)
        socket.broadcast.to(room.name).emit("page:lines", {wiki, title, lines})
        const page = await Page.findOne(ambiguous({wiki, title})) || new Page({wiki, title})
        page.lines = lines
        page.saveLater()
      }
      catch(err){
        console.error(err.stack || err)
      }
      ack({success: "ok"})
    })

    ioreq(socket).response("page:title:change", async (req, res) => {
      const {wiki, title, newTitle} = req
      let _res
      try{
        const page = await Page.findOne({wiki, title})
        if(!page){
          return res("page not found")
        }
        _res = await page.rename(newTitle)
      }
      catch(err){
        console.error(err.stack || err)
        return res({error: err.message})
      }
      io.to(room.name).emit("page:title:change", {wiki, title: newTitle})
      return res({success: _res})
     })

})
}
