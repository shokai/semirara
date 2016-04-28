/* eslint-disable react/prop-types, react/no-danger */

import React from "react";

import hljs, {highlight} from "highlight.js";

const reverseAliases = {};
for(let lang of hljs.listLanguages()){
  let aliases = hljs.getLanguage(lang).aliases;
  if(aliases){
    for(let alias of aliases){
      reverseAliases[alias] = lang;
    }
  }
}

export function getFullLanguage(lang){
  return reverseAliases[lang];
}

export default function Code({lang, code}){
  let __html;
  try{
    __html = highlight(lang, code, true).value;
  }
  catch(err){
    return <span>{code}</span>;
  }
  return <span className="codeblock" dangerouslySetInnerHTML={{__html}} />;
}
