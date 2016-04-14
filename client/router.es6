// route: /wiki/page

export function parse(path){
  let route = {};
  const m = decodeURI(path).match(/^\/([^\/]+)\/([^\/]+)/);
  if(m){
    route.wiki = m[1];
    route.title = m[2];
  }
  return route;
}

export function build(route){
  return `/${route.wiki}/${route.title}`;
}

import {getStore} from "./store";
const store = getStore();

store.subscribe(() => {
  const state = store.getState();
  const {wiki, title} = state.page;
  document.title = `${wiki}::${title}`;
  if(decodeURI(location.pathname+location.search) !== build({wiki, title})){
    history.pushState({wiki, title}, document.title, build({wiki, title}));
  }
});

window.addEventListener("popstate", (e) => {
  store.dispatch({type: "route", value: e.state});
}, false);

store.dispatch({
  type:"route",
  value: Object.assign({wiki: "general", title: "test"}, parse(location.pathname+location.search))
});
