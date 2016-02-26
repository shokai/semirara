module.exports = (app) => {

  app.use(async (ctx, next) => {
    ctx.body = "hello";
  });

}
