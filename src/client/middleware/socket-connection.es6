export const stopEditOnSocketDisconnect = store => next => action => {
  if(action.type === "editline" || action.type === "page:title:startEdit"){
    const {connecting} = store.getState().socket
    if(!connecting) return
  }
  if(action.type === "socket:disconnect"){
    store.dispatch({type: "editline", value: null})
    store.dispatch({type: "page:title:cancelEdit"})
  }
  return next(action)
}
