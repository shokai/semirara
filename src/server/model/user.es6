const debug = require("debug")("semirara:model:user");

import GitHub from "../lib/github";
import Cache from "../lib/cache";
const sessionCache = new Cache({
  prefix: "session",
  expire: 60*60*24*14 // 14days
});
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubToken: {
    type: String
  },
  github: {
    type: Object
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
});

userSchema.pre("save", function(next){
  this.updatedAt = Date.now();
  next();
});

userSchema.post("save", function(user){
  debug(`save!  ${user._id}`);
});

userSchema.methods.isLogin = function(){
  return typeof this.githubToken === "string" && this.githubToken.length > 0;
};

userSchema.statics.createOrFindByGithubToken = async function(token){
  debug("create or find user by github token: " + token);
  const github = new GitHub(token);
  const userInfo = await github.getUser();
  debug(userInfo);
  const user =
          await User.findOne({"github.id": userInfo.id}) ||
          new User({github: userInfo});
  return user;
};

userSchema.methods.setSession = async function(session){
  return sessionCache.set(session, this.github.id);
};

userSchema.statics.findBySession = async function(session){
  debug("find user by session: " + session);
  const githubId = await sessionCache.get(session);
  if(!githubId) return null;
  return User.findOne({"github.id": githubId});
};

const User = mongoose.model('User', userSchema);

export function deleteSession(session){
  if(!session || typeof session !== "string"){
    return Promise.reject("invalid session");
  }
  return sessionCache.delete(session);
}
