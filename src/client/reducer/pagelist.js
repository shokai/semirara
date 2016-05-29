import uniq from "lodash.uniq"

export default function pageListReducer(state = [], action){
  switch(action.type){
    case "pagelist":
      state = action.value
      break
    case "pagelist:update":
      state.unshift(action.value)
      state = uniq(state)
      break
    case "pagelist:remove":
      state = state.filter(x => x !== action.value)
      break
  }
  return state
}
