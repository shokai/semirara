// const debug = require('../../share/debug')(__filename)

import React, {Component, PropTypes} from "react"
import RouteLink from './route-link'
import classnames from "classnames"

export default class PageList extends Component {

  static get propTypes () {
    return {
      wiki: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      pagelist: PropTypes.object.isRequired,
      action: PropTypes.object.isRequired
    }
  }

  render(){
    const list = this.props.pagelist.map(({title, image}) => {
      const style = image ? {
        backgroundImage: `url("${image}")`
      } : {}
      const classNames = classnames({
        image,
        selected: title === this.props.title
      })
      return (
        <li key={title} className={classNames} style={style}>
          <RouteLink
             action={this.props.action}
             route={{wiki: this.props.wiki, title}}>
            <span>{title}</span>
          </RouteLink>
        </li>
      )
    })
    return (
      <div className="pagelist">
        <h2>{this.props.name}({list.length})</h2>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
