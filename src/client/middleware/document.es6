import {buildTitle} from "../../share/title"

export const updateTitle = store => next => action => {
  const result = next(action)
  if(action.type === "route"){
    let {wiki, title} = store.getState().page
    document.title = buildTitle({wiki, title})
  }
  else if(/line|page/i.test(action.type)){
    let {wiki, title, lines} = store.getState().page
    document.title = buildTitle({wiki, title, lines})
  }
  return result
}
