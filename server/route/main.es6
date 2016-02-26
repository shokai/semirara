import route from "koa-route";

module.exports = (app) => {

  app.use(route.get("/", async (ctx, next) => {
    ctx.body = "hello";
  }));

  app.use(route.get("/login", async (ctx, next) => {
    ctx.body = "login";
  }));

}
