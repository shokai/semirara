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

export default function Code({lang, children}){
  let __html
  try{
    __html = lang ? highlight(lang, children, true).value : highlightAuto(children).value
  }
  catch(err){
    if (!(/Unknown language/.test(err.message))) {
      console.error(err.stack || err)
    }
    return <span>{children}</span>
  }
  return <span dangerouslySetInnerHTML={{__html}} />
}

Code.propTypes = {
  lang: React.PropTypes.string,
  children: React.PropTypes.string.isRequired
}
