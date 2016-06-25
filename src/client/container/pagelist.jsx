import React from 'react'
import StoreComponent from '../component/store-component'
import PageList from '../component/pagelist'

export default class PageListContainer extends StoreComponent {
  render () {
    const {wiki, title} = this.state.page
    const {pagelist, relatedPagelist} = this.state
    if (!wiki || !title) return null
    let related
    if (relatedPagelist && relatedPagelist.length > 0) {
      related = (
        <PageList
           name='Related'
           wiki={wiki}
           title={title}
           pagelist={relatedPagelist}
           action={this.action}
           />
      )
    }


    return (
      <div>
        {related}
        <PageList
           name={wiki}
           wiki={wiki}
           title={title}
           pagelist={pagelist}
           action={this.action}
           />
      </div>
    )
  }
}
