const debug = require("../../share/debug")(__filename)

import ioreq from "socket.io-request"
import mongoose from "mongoose"
const Page = mongoose.model("Page")

export default function use(app){

  const io = app.context.io

  io.on("connection", (socket) => {

    ioreq(socket).response("get-related-pagelist", async (req, res) => {
      const {wiki, title} = req
      debug(req)
      try{
        const page = await Page.findOneByWikiTitle({wiki, title})
        const pages = await page.findRelatedPages()
        debug(pages)
        res(pages.map(({title, image}) => ({title, image})))
      }
      catch(err){
        console.error(err.stack || err)
      }
    })

  })

}
