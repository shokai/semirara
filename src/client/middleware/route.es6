import {store} from "../store";
import {io} from "../socket";

import {buildPath, parseRoute, validateWiki, validateTitle} from "../../share/route";

export const validateOnRoute = store => next => action => {
  if(action.type !== "route") return next(action);
  const {wiki, title} = action.value;
  if(wiki){
    let result = validateWiki(wiki);
    if(result.invalid){
      alert(result.errors);
      return;
    }
  }
  if(title){
    let result = validateTitle(title);
    if(result.invalid){
      alert(result.errors);
      return;
    }
  }
  return next(action);
};

export const pushStateOnRoute = store => next => action => {
  if(["route", "page"].indexOf(action.type) < 0){
    return next(action);
  }
  if(action.noPushState){
    delete action.noPushState;
    return next(action);
  }
  const _state = store.getState();
  const _wiki = _state.page.wiki;
  const _title = _state.page.title;
  const result = next(action);
  const {wiki, title} = store.getState().page;
  document.title = `${wiki}::${title}`;
  if(_title !== title || _wiki !== wiki){
    history.pushState({wiki, title}, document.title, buildPath({wiki, title}));
  }
  return result;
};

const defaultRoute = {wiki: "general", title: "hello"};

var popStateTimeout;
window.addEventListener("popstate", (e) => {
  clearTimeout(popStateTimeout);
  popStateTimeout = setTimeout(() => {
    store.dispatch({
      type: "route",
      value: Object.assign({}, defaultRoute, parseRoute()),
      noPushState: true
    });
  }, 500);
}, false);

io.on("connect", () => {
  store.dispatch({
    type: "route",
    value: Object.assign({}, defaultRoute, parseRoute())
  });
});
