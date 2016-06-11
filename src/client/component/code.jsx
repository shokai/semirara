/* eslint-disable react/no-danger */

import React from "react"

import hljs, {highlight, highlightAuto} from "highlight.js"

const reverseAliases = {}
for(let lang of hljs.listLanguages()){
  let aliases = hljs.getLanguage(lang).aliases
  if(aliases){
    for(let alias of aliases){
      reverseAliases[alias] = lang
    }
  }
}

export function getFullLanguage(lang){
  return reverseAliases[lang]
}

export default function Code({lang, code}){
  let __html
  try{
    __html = lang ? highlight(lang, code, true).value : highlightAuto(code).value
  }
  catch(err){
    console.error(err.stack || err)
    return <span>{code}</span>
  }
  return <span dangerouslySetInnerHTML={{__html}} />
}

Code.propTypes = {
  lang: React.PropTypes.string,
  code: React.PropTypes.string.isRequired
}
