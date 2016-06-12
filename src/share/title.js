import {Parser} from './markup/parser'

function renderToPlainText(node){
  return node.value || node.description || node.title
}

export function buildTitle({wiki, title, lines}){
  let subtitle
  if(lines && lines.length > 0){
    for(let line of lines){
      if(!(/https?:\/\//.test(line.value))){
        let nodes = Parser.parse(line.value.trim())
        subtitle = nodes.map(renderToPlainText).join('')
        if(subtitle) break
      }
    }
  }

  if(subtitle){
    return `${title}: ${subtitle} - ${wiki}`
  }
  else{
    return `${title} - ${wiki}`
  }
}
