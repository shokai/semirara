import React, {PropTypes} from 'react'
import {buildPath} from "../../share/route"

export default function RouteLink({action, route, children}){
  function onClick(e){
    e.preventDefault()
    e.stopPropagation()
    action.route(route)
  }
  return (
    <a href={buildPath(route)} onClick={onClick}>{children}</a>
  )
}

RouteLink.propTypes = {
  action: PropTypes.object,
  route: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}
