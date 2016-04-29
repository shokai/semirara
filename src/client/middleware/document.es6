import {buildTitle} from "../../share/title";

export const updateTitle = store => next => action => {
  const result = next(action);
  if(action.type === "route" ||
     /line|page|route/i.test(action.type)){
    const {wiki, title, lines} = store.getState().page;
    document.title = buildTitle({wiki, title, lines});
  }
  return result;
};
