const debug = require("../../share/debug")(__filename)

import ioreq from "socket.io-request"
import Room from "./room"
import mongoose from "mongoose"
const Page = mongoose.model("Page")

export default function use(app){

  const io = app.context.io

  io.on("connection", (socket) => {

    const room = new Room(socket)

    ioreq(socket).response("getpagelist", async (req, res) => {
      const {wiki} = req
      room.join(wiki)
      try{
        const pages = await Page.findPagesByWiki(wiki)
        res(pages.map(({title, image}) => ({title, image})))
      }
      catch(err){
        console.error(err.stack || err)
      }
    })

  })

  Page.on("update", (page) => {
    const {wiki, title, image} = page
    debug(`update ${wiki}::${title}`)
    io.to(wiki).emit("pagelist:update", {title, image})
  })

  Page.on("remove", (page) => {
    const {wiki, title} = page
    debug(`remove ${wiki}::${title}`)
    io.to(wiki).emit("pagelist:remove", {title})
  })
}
