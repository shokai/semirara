import "babel-regenerator-runtime";

require("insert-css")(require("./styl/index.styl"));

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App />, document.getElementById("app"));
