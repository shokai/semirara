import Router from "koa-66";
const router = new Router();
export default router;

router.get("/", async (ctx, next) => {
  ctx.body = "hello";
});

import authRouter from "./auth";
router.mount("/auth", authRouter);
