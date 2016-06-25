export default function relatedPageListReducer(state = [], action){
  switch(action.type){
    case "related-pagelist":
      state = action.value
      break
  }
  return state
}
