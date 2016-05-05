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
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href={`/api/feed/${wiki}`}/>
        <TwitterCard page={state.page} />
      </head>
      <body>
        <div id="app">
          <App store={store} />
        </div>
      </body>
    </html>
  );

}

IndexStaticHTML.propTypes = {
  user: React.PropTypes.object.isRequired,
  app: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired
};
