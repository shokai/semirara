const debug = require("debug")("semirara:syntax");

export default function compile(str){
  str = strong(str);
  str = innerLink(str);
  debug(str);
  return str;
}

function strong(str){
  return str.replace(/\[\[\[([^\]]+)\]\]\]/g, (_, x) => `<strong>${x}</strong>`);
}

function innerLink(str){
  return str.replace(/\[\[([^\]]+)\]\]/g, (_, x) => `<span class="link" title="${x}">${x}</span>`);
}
