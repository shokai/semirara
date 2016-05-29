import pkg from "../../../package.json"
import Router from "koa-66"
const router = new Router()
export default router

import {setUserContext, ignoreFavicon} from "./middleware"
router.use(ignoreFavicon)

import authRouter from "./auth"
router.mount("/auth", authRouter)

import feedRouter from "./feed"
router.mount("/", feedRouter)

router.use(setUserContext)

import mongoose from "mongoose"
const Page = mongoose.model("Page")

import {buildPath, parseRoute, defaultRoute} from "../../share/route"

router.get("/*", async (ctx, next) => {
  let renderParam = {
    user: null,
    app: {
      name: pkg.name
    }
  }
  if(ctx.user){
    renderParam.user = {
      id: ctx.user.github.id,
      name: ctx.user.github.login,
      icon: ctx.user.github.avatar_url
    }
    return ctx.render("index", renderParam)
  }
  else{
    const route = parseRoute(ctx.originalUrl)
    const {wiki, title} = route
    if(!wiki || !title){
      return ctx.redirect(buildPath(Object.assign({}, defaultRoute, route)))
    }
    const page = await Page.findOneByWikiTitle({wiki, title}) || new Page({wiki, title})
    if(page.title !== title || page.wiki !== wiki){
      return ctx.redirect(buildPath({wiki: page.wiki, title: page.title}))
    }
    const pages = await Page.findPagesByWiki(wiki)
    renderParam.state = {
      page: typeof page.toHash === "function" ? page.toHash() : page,
      pagelist: pages.map(i => i.title)
    }
    return ctx.render("index-static", renderParam)
  }
})
