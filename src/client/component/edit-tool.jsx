import React from 'react'
import StoreComponent from './store-component'
import hasDom from 'has-dom'

export default class EditTool extends StoreComponent {

  constructor () {
    super()
    this.createNewPage = this.createNewPage.bind(this)
  }

  createNewPage (e) {
    e.preventDefault()
    const title = window.prompt('create new page')
    if (!title) return
    this.action.route({title})
  }

  render () {
    if (!hasDom()) return null

    return (
      <div className='edit-tool'>
        <ul>
          <li>
            <span onClick={this.createNewPage} className='button'>new page</span>
          </li>
        </ul>
      </div>
    )
  }

}
