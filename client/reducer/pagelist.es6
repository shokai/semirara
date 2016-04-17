import _ from "lodash";

export default function pageListReducer(state = [], action){
  switch(action.type){
  case "pagelist":
    state = action.value;
    break;
  case "pagelist:add":
    state.unshift(action.value);
    state = _.uniq(state);
    break;
  case "pagelist:remove":
    state = state.filter(x => x !== action.value);
    break;
  }
  return state;
}
