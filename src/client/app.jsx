const debug = require("../share/debug")(__filename)
import React from "react"
import StoreComponent from "./component/store-component"
import Header from "./component/header"
import Editor from "./component/editor"
import PageListContainer from "./container/pagelist"
import SocketStatus from "./component/socket-status"
import hasDom from "has-dom"

export default class App extends StoreComponent{

  mapState(state){
    return {}
  }

  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick(e){
    this.action.unsetEditline()
    this.action.cancelTitleEdit()
  }

  render(){
    debug("render()")
    const {store} = this.props
    const socketStatus = hasDom() ? <SocketStatus store={store} /> : null
    return (
      <div className="app" onClick={this.onClick}>
        <div className="main">
          <Header store={store} />
          <Editor store={store} />
          <PageListContainer store={store} />
          {socketStatus}
          <div className="footer" />
        </div>
      </div>
    )
  }
}
