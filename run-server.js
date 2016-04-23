require("babel-polyfill");

var path = './dist/server/';
if(process.env.NODE_ENV !== "production"){
  path = './src/server/';
  require("babel-register");
}

console.log("load " + path);
const server = require(path).server;

// start server
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`server start => port:${port}`);
