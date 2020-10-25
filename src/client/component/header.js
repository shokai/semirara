import React, {Component} from "react"

import EditTool from './edit-tool'
import Login from "./login"
import Title from "./title"
import PageDate from "./page-date"

export default class Header extends Component{

  static get propTypes(){
    return {
      store: React.PropTypes.object.isRequired
    }
  }

  render(){
    const {store} = this.props
    return(
      <div className="header">
        <div className='toolbar'>
          <EditTool store={store} />
          <Login />
          <div className='clear' />
        </div>
        <Title store={store} />
        <PageDate store={store} />
      </div>
    )
  }

}
