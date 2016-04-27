import "babel-regenerator-runtime";

import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer/";
import middlewares from "./middleware/";
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

ReactDOM.render(<App store={store} />, document.getElementById("app"));

import socket from "./socket";
socket(store);
