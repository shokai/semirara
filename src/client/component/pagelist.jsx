import React from "react"
import StoreComponent from "./store-component"
import RouteLink from './route-link'
import classnames from "classnames"

export default class PageList extends StoreComponent {

  constructor(){
    super()
    this.onItemClick = this.onItemClick.bind(this)
  }

  onItemClick(title){
    this.action.route({title})
  }

  render(){
    const {wiki} = this.state.page
    const list = this.state.pagelist.map(({title, image}) => {
      const style = image ? {
        backgroundImage: `url("${image}")`
      } : {}
      const classNames = classnames({
        image,
        selected: title === this.state.page.title
      })
      return (
        <li key={title} className={classNames} style={style}>
          <RouteLink action={this.action} route={{wiki, title}}><span>{title}</span></RouteLink>
        </li>
      )
    })
    return (
      <div className="pagelist">
        <h2>{wiki}({list.length})</h2>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
