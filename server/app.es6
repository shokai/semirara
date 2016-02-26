/* eslint no-console: 0 */

import Koa from "koa";
const app = new Koa


// load components
const components = {
  models: [],
  routes: [ "logger", "main" ]
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
