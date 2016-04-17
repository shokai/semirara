import {store} from "../store";

export function buildPath(route){
  return `/${route.wiki}/${route.title}`;
}

export function parseRoute(path){
  if(!path) path = location.pathname+location.search;
  let route = {};
  const m = decodeURI(path).match(/^\/([^\/]+)\/([^\/]+)/);
  if(m){
    route.wiki = m[1];
    route.title = m[2];
  }
  return route;
}

export const pushStateOnRoute = store => next => action => {
  if(action.type !== "route") return next(action);
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

var popStateTimeout;
window.addEventListener("popstate", (e) => {
  clearTimeout(popStateTimeout);
  popStateTimeout = setTimeout(() => {
    store.dispatch({
      type: "route",
      value: Object.assign({wiki: "general", title: "test"}, parseRoute()),
      noPushState: true
    });
  }, 500);
}, false);

window.addEventListener("load", (e) => {
  store.dispatch({
    type: "route",
    value: Object.assign({wiki: "general", title: "test"}, parseRoute())
  });
}, false);
