const debug = require("debug")("semirara:model:page");

import {ambiguous} from "./";
import Cache from "../lib/cache";
const pageCache = new Cache({
  prefix: "page",
  expire: 60*60 // 60min
});

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  wiki: {
    type: String,
    required: true
  },
  lines: {
    type: Array,
    default: [ ],
    required: true
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

pageSchema.pre("save", function(next){
  this.updatedAt = Date.now();
  this.lines = this.lines
    .map(line => {
      line.value = line.value.trim();
      return line;
    })
    .filter(line => line.value.length > 0);
  next();
});

pageSchema.plugin(autoIncrement.plugin, {
  model: "Page",
  field: "number",
  startAt: 1
});

pageSchema.post("save", function(page){
  debug("save! " + page._id);
  if(page.lines.length < 1){
    Page.emit("remove", page);
  }
  else{
    Page.emit("update", page);
  }
});

pageSchema.statics.findNotEmpty = function(...args){
  args[0].lines = {$ne: []};
  return this.find(...args);
};

pageSchema.statics.findOneByWikiTitle = async function(query){
  const {wiki, title} = query;
  return await pageCache.get(`${wiki}::${title}`) || this.findOne(ambiguous(query));
};

const saveTimeouts = {};
pageSchema.methods.saveWithCache = function(){
  const key = `${this.wiki}::${this.title}`;
  clearTimeout(saveTimeouts[key]);
  pageCache.set(key, this.toHash());
  saveTimeouts[key] = setTimeout(this.save, 20000);
};

pageSchema.methods.toHash = function(){
  return {
    wiki: this.wiki,
    title: this.title,
    number: this.number,
    lines: this.lines,
    indent: this.indent,
    updatedAt: this.updatedAt,
    createdAt: this.createdAt
  };
};

const Page = mongoose.model("Page", pageSchema);
