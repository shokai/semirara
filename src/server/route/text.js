import Router from "koa-66"
const router = new Router()
export default router

import mongoose from "mongoose"
const Page = mongoose.model("Page")

router.get("/text/:wiki/:title", async (ctx, next) => {
  const {wiki, title} = ctx.params
  const page = await Page.findOneByWikiTitle({wiki, title})
  if (!page) return ctx.status = 404
  ctx.body = page.lines
    .map(line => ' '.repeat(line.indent) + line.value)
    .join('\n')
  return
})
