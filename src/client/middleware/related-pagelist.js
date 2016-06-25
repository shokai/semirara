import {io} from "../socket"
import ioreq from "socket.io-request"

export const getRelatedPageListOnRoute = store => next => async (action) => {
  if(action.type !== "route") return next(action)
  const result = next(action)
  const {wiki, title} = store.getState().page
  try{
    const relatedPagelist = await ioreq(io).request("get-related-pagelist", {wiki, title})
    store.dispatch({type: "related-pagelist", value: relatedPagelist})
  }
  catch(err){
    console.error(err.stack || err)
  }
  return result
}
