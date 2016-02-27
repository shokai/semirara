require("babel-polyfill");

var path = './dist';
if(process.env.NODE_ENV !== "production"){
  path = './src';
  require("babel-register");
}

console.log("load " + path);
var app = require(path);

// start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server start => port:${port}`);

