import React from "react"
import {validateTitle, validateWiki, validateRoute} from "../../../share/route"
import {renderToJSX} from "../../../share/markup/render"
import {Parser} from "../../../share/markup/parser"
import RouteLink from "../route-link"
import Code from "../code"

export function createCompiler({action, state}){
  const {wiki} = state.page
  const compiler = function(str){
    const nodes = Parser.parse(str)
    return nodes.map((node) => {
      switch(node.type){
        case "title-link": {
          let {title} = node
          if(validateTitle(title).invalid) return <span>{node.source}</span>
          return <RouteLink action={action} route={{wiki, title}}>{title}</RouteLink>
        }
        case "title-link-hash": {
          let {title} = node
          if(validateTitle(title).invalid) return <span>{node.source}</span>
          return (
            <span>
              {" "}
              <RouteLink action={action} route={{wiki, title}}>{`#${title}`}</RouteLink>
              {" "}
            </span>
          )
        }
        case "wiki-link": {
          let {wiki} = node
          if(validateWiki(wiki).invalid) return <span>{node.source}</span>
          return <RouteLink action={action} route={{wiki}}>{wiki}::</RouteLink>
        }
        case "wiki-title-link": {
          let {wiki, title} = node
          if(validateRoute({wiki, title}).invalid) return <span>{node.source}</span>
          return <RouteLink action={action} route={{wiki, title}}>{`${wiki}::${title}`}</RouteLink>
        }
        case "inline-code":
          return <span className="inline-code"><Code code={node.value} /></span>
        default:
          return renderToJSX(node)
      }
    })
  }
  compiler.displayName = "compiler"
  return compiler
}

createCompiler.propTypes = {
  action: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired
}
