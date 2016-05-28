import React from "react"
import StoreComponent from "./store-component"
import classnames from "classnames"

export default class SocketStatus extends StoreComponent{

  mapState(state){
    return state.socket
  }

  render(){
    const {connecting} = this.state
    const className = classnames({
      "connect": connecting,
      "disconnect": !connecting
    })
    const text = connecting ? "connecting" : "disconnected"
    return (
      <div className="socket-status">
        <span className={className}>{text}</span>
      </div>
    )
  }
}
