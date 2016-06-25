import React from 'react'
import StoreComponent from '../component/store-component'
import PageList from '../component/pagelist'

export default class PageListContainer extends StoreComponent {
  render () {
    this.debug(this.state)
    const {wiki, title} = this.state.page
    const {pagelist} = this.state
    if (!wiki || !title) return null
    return (
      <PageList
         wiki={wiki}
         title={title}
         pagelist={pagelist}
         />
    )
  }
}
