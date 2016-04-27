export function route({wiki, title}){
  return {type: "route", value: {wiki, title}};
}

export function setEditline(value){
  return {type: "editline", value};
}

export function updateLine(value){
  return {type: "updateLine", value};
}

export function insertNewLine(){
  return {type: "insertNewLine"};
}

export function swapLineUp(){
  return {type: "swapLineUp"};
}

export function swapLineDown(){
  return {type: "swapLine:down"};
}

export function swapBlockUp(){
  return {type: "swapBlock:up"};
}

export function swapBlockDown(){
  return {type: "swapBlock:down"};
}

export function editlineUp(){
  return {type: "editline:up"};
}

export function editlineDown(){
  return {type: "editline:down"};
}

export function indentIncrement(){
  return {type: "indent:increment"};
}

export function indentDecrement(){
  return {type: "indent:decrement"};
}

export function indentBlockIncrement(){
  return {type: "indentBlock:increment"};
}

export function indentBlockDecrement(){
  return {type: "indentBlock:decrement"};
}

export function insertMultiLines(lines){
  return {type: "insertMultiLines", value: lines};
}
