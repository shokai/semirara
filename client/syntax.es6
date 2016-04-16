const debug = require("debug")("semirara:syntax");

import React from "react";
import {getStore} from "./store";
const store = getStore();

export default function compile(str){
  let chunks = split(str);
  return chunks.map((chunk) => {
    for(let method of [strong, externalLinkWithTitle, image, externalLink, wikiLink, innerLink]){
      chunk = method(chunk);
      if(typeof chunk !== "string") return chunk;
    }
    return chunk;
  })
}

function split(str){
  return str.split(/(\[{2,3}[^\]]+\]{2,3})/).filter(i => i.length > 0);
}

function gyazz2jsx(regex, replacer){
  return function(chunk){
    if(typeof chunk !== "string") return chunk;
    const m = chunk.match(regex);
    if(!m) return chunk;
    return replacer(m);
  }
}

const strong = gyazz2jsx(/\[{3}(.+)\]{3}/, (m) => <strong>{m[1]}</strong>);

const innerLink = gyazz2jsx(/\[{2}(.+)\]{2}/, (m) => {
  const title = m[1];
  const onClick = (e) => {
    store.dispatch({type: "route", value: {title}});
  };
  return (
    <span className="link" onClick={onClick}>
      {m[1]}
    </span>
  );
});

const wikiLink = gyazz2jsx(/\[{2}([^\]]+)::([^\]]+)\]{2}/, (m) => {
  const [src, wiki, title] = m;
  const onClick = e => store.dispatch({type: "route", value: {wiki, title}});
  return <span className="link" onClick={onClick}>{`${wiki}::${title}`}</span>;
});

const externalLinkWithTitle = gyazz2jsx(/\[{2}(https?:\/\/.+) (.+)\]{2}/, (m) => {
  return <a href={m[1]} target="_blank">{m[2]}</a>;
});

const externalLink = gyazz2jsx(/\[{2}(https?:\/\/.+)\]{2}/, (m) => <a href={m[1]}>{m[1]}</a>);

const image = gyazz2jsx(/\[{2}(https?:\/\/.+)\.(jpe?g|gif|png)\]{2}/i, (m) => <img src={`${m[1]}.${m[2]}`} />);
