/* eslint no-console: 0 */

import Koa from "koa";
const app = new Koa

app.use(async (ctx, next) => {
  console.log(ctx);
});

app.use(async (ctx, nexf) => {
  ctx.body = "hello";
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server start => port:${port}`);
