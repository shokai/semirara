const debug = require("debug")("semirara:socket");

import * as Page from "./page";
import * as List from "./list";

export function use(app){

  Page.use(app);
  List.use(app);

}
