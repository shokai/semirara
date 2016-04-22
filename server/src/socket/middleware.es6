const debug = require("debug")("semirara:socket:middleware");
import Cookie from "cookie";

import mongoose from "mongoose";
const User = mongoose.model("User");

export async function setUserContext(socket, next){
  debug("set socket.user");
  try{
    const session = Cookie.parse(socket.request.headers.cookie).session;
    if(!session) return next();
    socket.user = await User.findBySession(session);
    if(socket.user) debug(`socket.user=${socket.user.github.login}`);
  }
  catch(err){
    console.error(err.stack || err);
    return next(new Error('Auth Error'));
  }
  return next();
}
