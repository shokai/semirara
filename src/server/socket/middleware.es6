const debug = require("debug")("semirara:socket:middleware");
import Cookie from "cookie";

import mongoose from "mongoose";
const User = mongoose.model("User");

export async function setUserContext(socket, next){
  debug("set socket.user");
  try{
    const cookie = socket.request.headers.cookie;
    if(!cookie) throw "cookie is not exists";
    const session = Cookie.parse(socket.request.headers.cookie).session;
    if(!session) throw "session is not exists in cookie";
    socket.user = await User.findBySession(session);
    if(socket.user) debug(`socket.user=${socket.user.github.login}`);
  }
  catch(err){
    debug(err.stack || err);
    socket.disconnect();
  }
  return next();
}
