/* eslint no-console: 0 */

import '../share/print-all-errors'

import model from "./model"
model.connect().catch(console.error)

import Koa from "koa"
const app = new Koa

import convert from "koa-convert"
import koaStatic from "koa-static"
app.use(convert(koaStatic("./public")))

import {Server} from "http"
const server = Server(app.callback())

import SocketIO from "socket.io"
app.context.io = SocketIO(server)
import * as socket from "./socket"
socket.use(app)

import pkg from "../../package.json"
app.name = pkg.name

import logger from "koa-logger"
app.use(logger())

import router from "./route"
app.use(router.routes())

import react from "koa-react-view"
import path from "path"

react(app, {
  views: path.join(__dirname, "views"),
  extname: '.js',
  internals: false
})

module.exports = { app, server }
