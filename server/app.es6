/* eslint no-console: 0 */

import Koa from "koa";
import logger from "koa-logger";

const app = new Koa

app.use(logger());

// load components
const components = {
  model: [],
  route: [ "main" ]
};

for(let type in components){
  components[type].forEach(name => {
    if(typeof name === "string"){
      require(`./${type}/${name}`)(app);
    }
  });
}


// start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server start => port:${port}`);
