const debug = require("debug")("semirara:reducer");

export default function user(state, action){
  debug(`action.type = ${action.type}`);
  switch(action.type){
  case "app:rename":
    state.app.name = action.value;
    debug(state);
    break;
  }
  return state;
}
