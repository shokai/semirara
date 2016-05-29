import ioreq from "socket.io-request"

export default function use({io, store, action}){

  io.once("connect", () => {
    io.on("connect", async () => { // for next connect event
      const {wiki} = store.getState().page
      try{
        const pagelist = await ioreq(io).request("getpagelist", {wiki})
        action.setPageList(pagelist)
      }
      catch(err){
        console.error(err.stack || err)
      }
    })
  })

  io.on("pagelist:update", ({title, image}) => {
    action.pagelistUpdate({title, image})
  })

  io.on("pagelist:remove", ({title}) => {
    action.pagelistRemove({title})
  })

}
