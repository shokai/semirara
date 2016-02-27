/* eslint no-console: 0 */

import Koa from "koa";
const app = new Koa

import logger from "koa-logger";
app.use(logger());

import router from "./route";
app.use(router.routes());

module.exports = app;

