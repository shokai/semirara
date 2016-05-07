export const stopEditOnSocketDisconnect = store => next => action => {
  if(action.type !== "socket:disconnect") return next(action);
  const result = next(action);
  store.dispatch({type: "editline", value: null});
  store.dispatch({type: "page:title:cancelEdit"});
  return result;
};
