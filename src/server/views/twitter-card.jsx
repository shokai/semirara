import React from "react";
import {buildTitle} from "../../share/title";

export default function TwitterCard({state}){
  const {wiki, title, lines} = state.page;
  const description = lines.map(i => i.value)
          .join('')
          .replace(/https?:\/\/[^\s]+/g, "")
          .replace(/[\[\]]/g, "")
          .slice(0, 200);
  return (
    <x-twitter-card>
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:title" value={buildTitle({wiki, title, lines})} />
      <meta name="twitter:description" value={description} />
    </x-twitter-card>
  );
}

TwitterCard.propTypes = {
  state: React.PropTypes.object.isRequired
};
