import {buildPath, validateWiki, validateTitle} from "../../share/route"

export const validateOnRoute = store => next => action => {
  if(action.type !== "route") return next(action)
  const {wiki, title} = action.value
  if(wiki){
    let result = validateWiki(wiki)
    if(result.invalid){
      alert(result.errors)
      return
    }
  }
  if(title){
    let result = validateTitle(title)
    if(result.invalid){
      alert(result.errors)
      return
    }
  }
  return next(action)
}

export const pushStateOnRoute = store => next => action => {
  if(["route", "page"].indexOf(action.type) < 0){
    return next(action)
  }
  if(action.noPushState){
    delete action.noPushState
    return next(action)
  }
  const _state = store.getState()
  const _wiki = _state.page.wiki
  const _title = _state.page.title
  const result = next(action)
  const {wiki, title} = store.getState().page
  if(_title !== title || _wiki !== wiki){
    history.pushState({wiki, title}, document.title, buildPath({wiki, title}))
  }
  return result
}

export const scrollTopOnRoute = store => next => action => {
  if(action.type !== "route") return next(action)
  const result = next(action)
  window.scrollTo(0, 0)
  return result
}
