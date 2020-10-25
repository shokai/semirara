import React, {Component} from "react"
import UserIcon from "./usericon"
import hasDom from "has-dom"

export default class Login extends Component {

  static get propTypes(){
    return {
      user: React.PropTypes.object
    }
  }

  static get defaultProps(){
    return {
      user: hasDom() ? window.user : null
    }
  }

  render(){
    let element
    if(!this.props.user){
      element = <ul><li><span><a href="/auth/login">login</a></span></li></ul>
    }
    else{
      element = (
        <ul>
          <li>
            <span>
              <a href={"https://github.com/"+this.props.user.name}>
                <UserIcon id={this.props.user.id} size={20} />
                {this.props.user.name}
              </a>
            </span>
          </li>
          <li><span><a href="/auth/logout">logout</a></span></li>
        </ul>
      )
    }
    return (
      <div className="login">{element}</div>
    )
  }
}
