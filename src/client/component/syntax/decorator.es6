// decorate lines
// put some annotation properties to page.lines

import clone from "clone";

export function decorateLines(lines){
  const _lines = clone(lines);
  addLangToLines(_lines);
  showUserIcon(_lines);
  return _lines;
}

export function detectLang(str){
  const m = str.match(/^code:(.+)$/);
  if(m) return m[1];
  return null;
}

function detectCLI(str){
  const m = str.match(/^([\%\$]) (.+)/);
  if(m){
    const [, prefix, command] = m;
    return {prefix, command};
  }
  return false;
}

function addLangToLines(lines){
  let lang, indent;
  for(let line of lines){
    if(lang && line.indent > indent){
      line.lang = lang;
    }
    else{
      line.lang = lang = detectLang(line.value);
      if(lang){
        indent = line.indent;
        line.codestart = true;
      }
      else{
        indent = null;
        line.cli = detectCLI(line.value);
      }
    }
  }
}

export function showUserIcon(lines){
  for(let i = 0; i < lines.length; i++){
    lines[i].showUserIcon =
      ((position) => {
        if(position < 1) return true;
        const currentLine = lines[position];
        if(!currentLine.user) return false;
        for(let i = position-1; i >= 0; i--){
          let line = lines[i];
          if(line.indent <= currentLine.indent){
            if(line.user === currentLine.user) return false;
            if(line.user !== currentLine.user) return true;
          }
          if(line.indent < 1) break;
        }
        return true;
      })(i);
  }
}

