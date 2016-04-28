import "babel-regenerator-runtime";

import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware, bindActionCreators} from "redux";
import reducer from "./reducer/";
import middlewares from "./middleware/";
import * as actions from "./action/";
import App from "./app";
import Line from "./line";

const store = createStore(
  reducer,
  {
    page: {
      lines: [ new Line ],
      editline: null
    },
    pagelist: [ ]
  },
  applyMiddleware(...middlewares)
);

render(<App store={store} />, document.getElementById("app"));

import socket from "./socket";
socket({
  store,
  action: bindActionCreators(actions, store.dispatch)
});
