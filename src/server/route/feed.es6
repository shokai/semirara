import Feed from "feed";
import {renderToStaticMarkup} from "react-dom/server";
import React, {createElement} from "react";

import Router from "koa-66";
const router = new Router();
export default router;

import mongoose from "mongoose";
const Page = mongoose.model("Page");

import {createCompiler} from "../../client/component/syntax";

router.get("/api/feed/:wiki", async (ctx, next) => {
  const {wiki} = ctx.params;
  const pages = await Page.findNotEmpty({wiki}, null, {sort: {updatedAt: -1}}).limit(30);
  if(pages.length < 1) return ctx.status = 404;
  const compiler = createCompiler({state: {
    page: {wiki}
  }});
  const feed = new Feed({
    title: wiki,
    link: ctx.request.protocol+"://"+ctx.request.host+"/"+wiki,
    description: wiki,
    updated: pages[0].updatedAt
  });
  for(let page of pages){
    let title = page.wiki + "::" + page.title;
    let link = ctx.request.protocol+"://"+ctx.request.host+"/"+wiki+"/"+page.title;
    let description = page.lines
          .map(i =>
               compiler(i.value)
               .map(elm => typeof elm === "string" ? elm : renderToStaticMarkup(elm))
               .join("")
              )
          .join("<br />");
    let date = page.updatedAt;
    feed.addItem({title, link, description, date});
  }
  return ctx.body = feed.render("rss-2.0");
});
