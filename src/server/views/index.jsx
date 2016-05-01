/* eslint-disable react/no-danger */

import React from "react";

export default function IndexHTML({user, app}){

  const script = `window.user = ${JSON.stringify(user)}; window.app = ${JSON.stringify(app)};`;

  const cdnjs = (
    <x-cdnjs>
      <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react.min.js" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react-dom.min.js" />
    </x-cdnjs>
  );

  return (
    <html>
      <head>
        <meta name="viewport" content="width=640px" />
        <title>{app.name}</title>
        <link rel="stylesheet" href="/dist/index.css" />
        <script dangerouslySetInnerHTML={{__html: script}} />
      </head>
      <body>
        <div id="app" />
        {process.env.NODE_ENV === "production" ? cdnjs : null}
        <script src="/dist/index.js" />
      </body>
    </html>
  );

}

IndexHTML.propTypes = {
  user: React.PropTypes.object.isRequired,
  app: React.PropTypes.object.isRequired
};
