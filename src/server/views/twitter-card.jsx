import React from "react"
import {buildTitle} from "../../share/title"

export default function TwitterCard({page}){
  const {wiki, title, lines, image} = page
  const description = lines.map(i => i.value)
          .join('')
          .replace(/https?:\/\/[^\s]+/g, "")
          .replace(/[\[\]]/g, "")
          .slice(0, 200)

  const imageCard = image ? <meta name="twitter:image" value={image} /> : null
  return (
    <x-twitter-card>
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:title" value={buildTitle({wiki, title, lines})} />
      <meta name="twitter:description" value={description} />
      {imageCard}
    </x-twitter-card>
  )
}

TwitterCard.propTypes = {
  page: React.PropTypes.object.isRequired
}
