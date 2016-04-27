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

import {parseRoute} from "../../share/route";

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
    ctx.render("index", renderParam);
  }
  else{
    const {wiki, title} = parseRoute(ctx.path);
    renderParam.state = {
      page: await Page.findOneByWikiTitle({wiki, title}),
      pagelist: (await Page.findNotEmpty({wiki}, 'title', {sort: {updatedAt: -1}})).map(i => i.title)
    };
    ctx.render("index_static", renderParam);
  }
});
