module.exports = (app) => {

  app.use(async (ctx, next) => {
    next();
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
  });

};
