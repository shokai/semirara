import React from "react";
import {validateTitle, validateWiki, validateRoute} from "../../../share/route";
import {renderToJSX} from "../../../share/markup/render";
import {Parser} from "../../../share/markup/parser";

export function removeMarkup(str){
  return str.replace(/\[{2,3}([^\]]+)\]{2,3}/gi, (_, inside) => inside);
}

export function createCompiler({action, state}){
  const {wiki} = state.page;
  const compiler = function(str){
    const nodes = Parser.parse(str);
    return nodes.map((node) => {
      switch(node.type){
        case "title-link": {
          let {title} = node;
          if(validateTitle(title).invalid) return <span>{node.source}</span>;
          let onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            action.route({title});
          };
          return <a href={`/${wiki}/${node.title}`} onClick={onClick}>{node.title}</a>;
        }
        case "wiki-link": {
          let {wiki} = node;
          if(validateWiki(wiki).invalid) return <span>{node.source}</span>;
          let onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            action.route({wiki});
          };
          return <a href={`/${wiki}`} onClick={onClick}>{node.wiki}::</a>;
        }
        case "wiki-title-link": {
          let {wiki, title} = node;
          if(validateRoute({wiki, title}).invalid) return <span>{node.source}</span>;
          let onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            action.route({wiki, title});
          };
          return <a href={`/${wiki}/${title}`} onClick={onClick}>{`${wiki}::${title}`}</a>;
        }
        default:
          return renderToJSX(node);
      }
    });
  };
  compiler.displayName = "compiler";
  return compiler;
}

createCompiler.propTypes = {
  action: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired
};
