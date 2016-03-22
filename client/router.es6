// route: /wiki/page

export function parse(path){
  let route = {};
  const m = path.match(/^\/([^\/]+)\/([^\/]+)/);
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
  if(location.pathname !== build({wiki, title})){
    history.pushState(null, null, build({wiki, title}));
  }
});

store.dispatch({
  type:"route",
  value: Object.assign({wiki: "general", title: "test"}, parse(location.pathname))
});
