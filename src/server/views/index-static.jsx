/* eslint-disable react/prop-types, react/no-danger */

import React from "react";
import {createStore} from "redux";
import App from "../../client/app";
import {buildTitle} from "../../share/title";

export default function IndexStaticHTML({user, app, state}){

  const store = createStore((state) => state, state);
  const {wiki, title, lines} = state.page;

  return (
    <html>
      <head>
        <title>{buildTitle({wiki, title, lines})}</title>
        <link rel="stylesheet" href="/dist/index.css" />
      </head>
      <body>
        <div id="app">
          <App store={store} />
        </div>
      </body>
    </html>
  );

}
