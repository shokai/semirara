const debug = require("debug")("semirara:model:user");

import GitHub from "../lib/github";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubToken: {
    type: String
  },
  github: {
    type: Object
  },
  session: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: function(){ return Date.now() }
  },
  createdAt: {
    type: Date,
    default: function(){ Date.now() }
  }
});

userSchema.pre("save", function(next){
  debug("save!");
  this.updatedAt = Date.now();
  next();
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

userSchema.statics.findBySession = async function(session){
  debug("find user by session: " + session);
  return User.findOne({session: session});
};

const User = mongoose.model('User', userSchema);

