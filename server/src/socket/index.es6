import {setUserContext} from "./middleware";

import page from "./page";
import list from "./pagelist";

export function use(app){

  app.context.io.use(setUserContext);

  page(app);
  list(app);

}
