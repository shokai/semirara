/* eslint-disable react/prop-types, react/no-danger */

import React from "react";

import {highlight} from "highlight.js";

export default function Code({lang, code}){
  let __html;
  try{
    __html = highlight(lang, code, true).value;
  }
  catch(err){
    return <span>{code}</span>;
  }
  return <span className="code" dangerouslySetInnerHTML={{__html}} />;
}
