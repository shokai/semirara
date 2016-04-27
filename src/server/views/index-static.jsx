/* eslint-disable react/prop-types, react/no-danger */

import React from "react";
import {createStore} from "redux";
import App from "../../client/app";

export default function IndexStaticHTML({user, app, state}){

  const store = createStore((state) => state, state);
  const {wiki, title} = state.page;

  return (
    <html>
      <head>
        <title>{`${wiki}::${title}`}</title>
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
