import React, {Component} from "react"

export default class LongPress extends Component{

  static get propTypes(){
    return {
      children: React.PropTypes.node.isRequired,
      threshold: React.PropTypes.number,
      onLongPress: React.PropTypes.func.isRequired
    }
  }

  static get defaultProps(){
    return {
      threshold: 500
    }
  }

  constructor(){
    super()
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.timeout = null
  }

  render(){
    return (
      <span
         onMouseDown={this.start}
         onMouseUp={this.stop}
         onMouseOut={this.stop}>
        {this.props.children}
      </span>
    )
  }

  start(e){
    this.stop()
    this.timeout = setTimeout(this.props.onLongPress, this.props.threshold)
  }

  stop(e){
    if(!this.timeout) return
    clearTimeout(this.timeout)
    this.timeout = null
  }

}
