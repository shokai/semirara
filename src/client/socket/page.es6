import ioreq from "socket.io-request";

export default function use({io, store}){

  io.once("connect", () => {
    io.on("connect", async () => { // for next connect event
      const state = store.getState();
      const {wiki, title} = state.page;
      try{
        const page = await ioreq(io).request("getpage", {wiki, title});
        store.dispatch({type: "page", value: page});
      }
      catch(err){
        console.error(err.stack || err);
      }
    });
  });

  io.on("page:lines", (page) => {
    if(!page.lines) return;
    store.dispatch({type: "page:lines", value: page});
  });

}
