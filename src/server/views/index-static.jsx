/* eslint-disable react/prop-types, react/no-danger */

import React from "react";
import {createStore} from "redux";
import App from "../../client/app";
import TwitterCard from "./twitter-card";
import {buildTitle} from "../../share/title";

export default function IndexStaticHTML({user, app, state}){

  const store = createStore((state) => state, state);
  const {wiki, title, lines} = state.page;

  return (
    <html>
      <head>
        <meta name="viewport" content="width=640px" />
        <title>{buildTitle({wiki, title, lines})}</title>
        <link rel="stylesheet" href="/dist/index.css" />
        <TwitterCard state={state} />
      </head>
      <body>
        <div id="app">
          <App store={store} />
        </div>
      </body>
    </html>
  );

}
