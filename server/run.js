require("babel-polyfill");

var path = './dist';
if(process.env.NODE_ENV !== "production"){
  path = './src';
  require("babel-register");
}

console.log("load " + path);
var server = require(path).server;

// start server
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`server start => port:${port}`);
