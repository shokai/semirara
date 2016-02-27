import Router from "koa-66";
const router = new Router();
export default router;

router.get("/login", async (ctx, next) => {
  ctx.body = "login";
});
