import {removeMarkup} from "../client/component/syntax/markup";

export function buildTitle({wiki, title, lines}){
  let subtitle;
  if(lines.length < 1){
    subtitle = "(empty)";
  }
  else{
    for(let line of lines){
      if(!(/https?:\/\//.test(line.value))){
        subtitle = removeMarkup(line.value.trim());
        break;
      }
    }
  }

  if(subtitle){
    return `${title}: ${subtitle} - ${wiki}`;
  }
  else{
    return `${title} - ${wiki}`;
  }
}
