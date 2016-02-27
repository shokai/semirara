/* eslint no-console: 0 */

import Koa from "koa";
const app = new Koa

import pkg from "../../package.json";
app.name = pkg.name;

import logger from "koa-logger";
app.use(logger());

import router from "./route";
app.use(router.routes());

import Jade from "koa-jade";
new Jade({
  app: app,
  viewPath: "server/view",
  debug: app.env === 'development',
  helperPath: [ ]
});

module.exports = app;

