import ioreq from "socket.io-request";

export default function use({io, store}){

  io.once("connect", () => {
    io.on("connect", async () => { // for next connect event
      const {wiki} = store.getState().page;
      try{
        const pagelist = await ioreq(io).request("getpagelist", {wiki});
        store.dispatch({type: "pagelist", value: pagelist});
      }
      catch(err){
        console.error(err.stack || err);
      }
    });
  });

  io.on("pagelist:update", (title) => {
    store.dispatch({type: "pagelist:update", value: title});
  });

  io.on("pagelist:remove", (title) => {
    store.dispatch({type: "pagelist:remove", value: title});
  });

}
