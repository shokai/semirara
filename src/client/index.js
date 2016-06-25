import "babel-regenerator-runtime"

import '../share/print-all-errors'

import React from "react"
import {render} from "react-dom"
import {createStore, applyMiddleware, bindActionCreators} from "redux"
import reducer from "./reducer/"
import middlewares from "./middleware/"
import * as actions from "./action/"
import App from "./app"
import Line from "./line"

const store = createStore(
  reducer,
  {
    page: {
      lines: [ new Line ],
      editline: null
    },
    pagelist: [ ],
    relatedPagelist: [],
    socket: {
      connecting: false
    }
  },
  applyMiddleware(...middlewares)
)

render(<App store={store} />, document.getElementById("app"))

import socket from "./socket"
socket({
  store,
  action: bindActionCreators(actions, store.dispatch)
})
