export function route({wiki, title}){
  return {type: "route", value: {wiki, title}}
}

export function noPushStateRoute({wiki, title}){
  return Object.assign(route({wiki, title}), {noPushState: true})
}

export function setPage(value){
  return {type: "page", value}
}

export function setPageLines({wiki, title, lines}){
  return {type: "page:lines", value: {wiki, title, lines}}
}

export function setPageList(value){
  return {type: "pagelist", value}
}

export function pagelistUpdate(value){
  return {type: "pagelist:update", value}
}

export function pagelistRemove(value){
  return {type: "pagelist:remove", value}
}

export function setEditline(value){
  return {type: "editline", value}
}

export function unsetEditline(){
  return {type: "editline", value: null}
}

export function updateLine(value){
  return {type: "updateLine", value}
}

export function insertNewLine(){
  return {type: "insertNewLine"}
}

export function swapLineUp(){
  return {type: "swapLine:up"}
}

export function swapLineDown(){
  return {type: "swapLine:down"}
}

export function swapBlockUp(){
  return {type: "swapBlock:up"}
}

export function swapBlockDown(){
  return {type: "swapBlock:down"}
}

export function editlineUp(){
  return {type: "editline:up"}
}

export function editlineDown(){
  return {type: "editline:down"}
}

export function indentIncrement(){
  return {type: "indent:increment"}
}

export function indentDecrement(){
  return {type: "indent:decrement"}
}

export function indentBlockIncrement(){
  return {type: "indentBlock:increment"}
}

export function indentBlockDecrement(){
  return {type: "indentBlock:decrement"}
}

export function insertMultiLines(lines){
  return {type: "insertMultiLines", value: lines}
}

export function startTitleEdit(){
  return {type: "page:title:startEdit"}
}

export function changeTitle(value){
  return {type: "page:title:change", value}
}

export function submitTitle(){
  return {type: "page:title:submit"}
}

export function cancelTitleEdit(){
  return {type: "page:title:cancelEdit"}
}
