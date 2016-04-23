import React from "react";
import {store} from "./store";

export default function compile(str){
  const methods = [strong, externalLinkWithTitle, image, externalLink, wikiLink, titleLink];
  const chunks = split(str);
  let i = 0;
  return chunks.map((chunk) => {
    i += 1;
    for(let method of methods){
      chunk = method(chunk, {key: i});
      if(typeof chunk !== "string") return chunk;
    }
    return chunk;
  });
}

function split(str){
  return str.split(/(\[{2,3}[^\]]+\]{2,3})/).filter(i => i.length > 0);
}

function gyazz2jsx(regex, replacer){
  return function(chunk, attrs){
    if(typeof chunk !== "string") return chunk;
    const m = chunk.match(regex);
    if(!m) return chunk;
    return replacer(m, attrs);
  };
}

const strong = gyazz2jsx(/\[{3}(.+)\]{3}/, (m, attrs) => <strong {...attrs}>{m[1]}</strong>);

const titleLink = gyazz2jsx(/\[{2}(.+)\]{2}/, (m, attrs) => {
  const title = m[1];
  const wiki = store.getState().page.wiki;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    store.dispatch({type: "route", value: {title}});
  };
  return <a href={`/${wiki}/${title}`} onClick={onClick} {...attrs}>{title}</a>;
});

const wikiLink = gyazz2jsx(/\[{2}([^\]]+)::([^\]]+)\]{2}/, (m, attrs) => {
  const [, wiki, title] = m;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    store.dispatch({type: "route", value: {wiki, title}});
  };
  return <a href={`/${wiki}/${title}`} onClick={onClick} {...attrs}>{`${wiki}::${title}`}</a>;
});

const externalLinkWithTitle = gyazz2jsx(/\[{2}(https?:\/\/.+) (.+)\]{2}/, (m, attrs) => {
  return <a href={m[1]} target="_blank" {...attrs}>{m[2]}</a>;
});

const externalLink = gyazz2jsx(/\[{2}(https?:\/\/.+)\]{2}/, (m, attrs) => <a href={m[1]} target="_blank" {...attrs}>{m[1]}</a>);

const image = gyazz2jsx(/\[{2}(https?:\/\/.+)\.(jpe?g|gif|png)\]{2}/i, (m, attrs) => <img src={`${m[1]}.${m[2]}`} title={m[0]} {...attrs} />);

