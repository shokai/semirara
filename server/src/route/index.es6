const debug = require("debug")("semirara:route");

import Router from "koa-66";
const router = new Router();
export default router;

import authRouter, {setUserContext} from "./auth";
router.mount("/auth", authRouter);

router.use(setUserContext);

router.get("/", async (ctx, next) => {
  let renderParam = { user: null };
  if(ctx.user){
    renderParam.user = {
      name: ctx.user.github.login,
      icon: ctx.user.github.avatar_url
    }
  }
  ctx.render("index", renderParam);
});
