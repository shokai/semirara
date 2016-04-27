import pkg from "../../../package.json";
import Router from "koa-66";
const router = new Router();
export default router;

import authRouter from "./auth";
router.mount("/auth", authRouter);

import {setUserContext} from "../lib/middleware";
router.use(setUserContext);

import mongoose from "mongoose";
const Page = mongoose.model("Page");

import {buildPath, parseRoute} from "../../share/route";

router.get("/*", async (ctx, next) => {
  let renderParam = {
    user: null,
    app: {
      name: pkg.name
    }
  };
  if(ctx.user){
    renderParam.user = {
      id: ctx.user.github.id,
      name: ctx.user.github.login,
      icon: ctx.user.github.avatar_url
    };
    return ctx.render("index", renderParam);
  }
  else{
    const {wiki, title} = parseRoute(ctx.path);
    const page = await Page.findOneByWikiTitle({wiki, title});
    if(!page) return ctx.throw(404);
    if(page.title !== title || page.wiki !== wiki){
      return ctx.redirect(buildPath({wiki: page.wiki, title: page.title}));
    }
    const pages = await Page.findPagesByWiki(wiki);
    renderParam.state = {
      page: page,
      pagelist: pages.map(i => i.title)
    };
    ctx.render("index_static", renderParam);
  }
});
