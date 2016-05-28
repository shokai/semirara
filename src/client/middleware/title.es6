import {io} from "../socket/"
import ioreq from "socket.io-request"
import {validateTitle} from "../../share/route"

export const onPageTitleSubmit = store => next => async (action) => {
  if(action.type !== "page:title:submit") return next(action)
  const {wiki, title, newTitle} = store.getState().page
  if(newTitle === title) return next(action)
  const valid = validateTitle(newTitle)
  if(valid.invalid){
    alert(valid.errors.join("\n"))
    return next(action)
  }
  const res = await ioreq(io).request("page:title:change", {title, wiki, newTitle})
  if(!res.error) return next(action)
  alert(res.error)
  return
}

export const cancelTitleEditOnRoute = store => next => action => {
  if(action.type !== "route") return next(action)
  store.dispatch({type: "page:title:cancelEdit"})
  return next(action)
}
