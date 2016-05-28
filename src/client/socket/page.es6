import ioreq from "socket.io-request"

export default function use({io, store, action}){

  io.once("connect", () => {
    io.on("connect", async () => { // for next connect event
      const state = store.getState()
      const {wiki, title} = state.page
      try{
        const page = await ioreq(io).request("getpage", {wiki, title})
        action.setPage(page)
      }
      catch(err){
        console.error(err.stack || err)
      }
    })
  })

  io.on("page:lines", (page) => {
    if(!page.lines) return
    action.setPageLines(page)
  })

}
