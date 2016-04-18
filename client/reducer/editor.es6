export default function editorReducer(state = {}, action){
  switch(action.type){
  case "editline":
    state.editline = action.value;
    break;
  }
  return state;
}
