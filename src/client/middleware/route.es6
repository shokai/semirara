import {store} from "../store";
import {io} from "../socket";

import {buildPath, parseRoute} from "../../share/route";

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

io.on("connect", () => {
  store.dispatch({
    type: "route",
    value: Object.assign({wiki: "general", title: "test"}, parseRoute())
  });
});
