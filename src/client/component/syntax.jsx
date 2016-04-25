import React from "react";
import {store} from "../store";
import {validateTitle, validateWiki, validateRoute} from "../../share/route";

export default function compile(str){
  const methods = [strong, externalLinkWithImage, externalLinkWithDescription, image, externalLink, wikiTitleLink, wikiLink, titleLink];
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

const titleLink = gyazz2jsx(/\[{2}(.+)\]{2}/, ([source, title], attrs) => {
  if(validateTitle(title).invalid) return source;
  const wiki = store.getState().page.wiki;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    store.dispatch({type: "route", value: {title}});
  };
  return <a className="internal" href={`/${wiki}/${title}`} onClick={onClick} {...attrs}>{title}</a>;
});

const wikiTitleLink = gyazz2jsx(/\[{2}([^\]]+)::([^\]]*)\]{2}/, ([source, wiki, title], attrs) => {
  if(validateRoute({wiki, title}).invalid) return source;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    store.dispatch({type: "route", value: {wiki, title}});
  };
  return <a className="internal" href={`/${wiki}/${title}`} onClick={onClick} {...attrs}>{`${wiki}::${title}`}</a>;
});

const wikiLink = gyazz2jsx(/\[{2}([^\]]+)::\]{2}/, ([source, wiki], attrs) => {
  if(validateWiki(wiki).invalid) return source;
  const onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    store.dispatch({type: "route", value: {wiki}});
  };
  return <a className="internal" href={`/${wiki}`} onClick={onClick} {...attrs}>{`${wiki}::`}</a>;
});

const externalLinkWithImage = gyazz2jsx(
    /\[{2}(https?:\/\/.+) (https?:\/\/.+)\.(jpe?g|gif|png)\]{2}/i
  , ([source, url, image, ext], attrs) => {
    return (
      <a href={url} target="_blank" {...attrs}>
        <img src={`${image}.${ext}`} />
      </a>
    );
  }
);

const externalLinkWithDescription = gyazz2jsx(
    /\[{2}(https?:\/\/.+) (.+)\]{2}/
    , ([source, url, description], attrs) => {
      return <a href={url} target="_blank" {...attrs}>{description}</a>;
    }
);

const externalLink = gyazz2jsx(
    /\[{2}(https?:\/\/.+)\]{2}/, ([source, url], attrs) => {
      return <a href={url} target="_blank" {...attrs}>{url}</a>;
    }
);

const image = gyazz2jsx(/\[{2}(https?:\/\/.+)\.(jpe?g|gif|png)\]{2}/i, (m, attrs) => <img src={`${m[1]}.${m[2]}`} title={m[0]} {...attrs} />);

export function detectLang(str){
  const m = str.match(/^code:(.+)$/);
  if(m) return m[1];
  return null;
}
