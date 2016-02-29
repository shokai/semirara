const debug = require("debug")("semirara:lib:middleware");

import mongoose from "mongoose";
const User = mongoose.model("User");

export async function setUserContext(ctx, next){
  debug("set ctx.user");
  const session = ctx.cookies.get("session");
  if(!session) return next();
  ctx.user = await User.findBySession(session);
  if(ctx.user) debug(`ctx.user="${ctx.user.github.login}"`);
  next();
}
