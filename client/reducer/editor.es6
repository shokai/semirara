export default function editorReducer(state = {}, action){
  switch(action.type){
  case "editline":
    state.editline = action.value;
    break;
  case "insertNewLine":
    if(state.editline > -1){
      state.editline += 1;
    }
    break;
  }
  return state;
}
