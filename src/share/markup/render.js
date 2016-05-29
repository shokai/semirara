import React from "react"

export function renderToJSX(node){
  switch(node.type){
    case "text":
      return <span>{node.value}</span>
    case "strong":
      return <strong>{node.value}</strong>
    case "image":
      return <img src={node.image} />
    case "external-link":
      return <a href={node.link} target="_blank">{node.link}</a>
    case "external-link-with-description":
      return <a href={node.link} target="_blank">{node.description}</a>
    case "external-link-with-image":
      return <a href={node.link} target="_blank"><img src={node.image} /></a>
    case "wiki-link":
      return <a href={`/${node.wiki}`}>{node.wiki}::</a>
    case "wiki-title-link":
      return <a href={`/${node.wiki}/${node.title}`}>{`${node.wiki}::${node.title}`}</a>
    case "title-link":
      // require store state
      break
  }
  throw new Error(`unknown node type "${node.type}"`)
}
