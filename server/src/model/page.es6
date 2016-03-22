const debug = require("debug")("semirara:model:page");

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

import {diffpatch, clone} from "../../../lib/diffpatch";

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
    default: [ ]
  },
  updatedAt: {
    type: Date,
    default: () => { return Date.now() }
  },
  createdAt: {
    type: Date,
    default: () => { return Date.now() }
  }
});

pageSchema.pre("save", function(next){
  this.updatedAt = Date.now();
  next();
});

pageSchema.plugin(autoIncrement.plugin, {
  model: "Page",
  field: "number",
  startAt: 1
});

pageSchema.post("save", function(){
  debug("save! " + this._id);
});

pageSchema.methods.toHash = function(){
  return {
    wiki: this.wiki,
    title: this.title,
    number: this.number,
    lines: this.lines,
    updatedAt: this.updatedAt,
    createdAt: this.createdAt
  };
};

pageSchema.methods.patchLines = function(diff){
  this.lines = diffpatch.patch(clone(this.lines), diff);
}

mongoose.model("Page", pageSchema);

export function isValidPageId(_id){
  return typeof _id === "number" && _id > 0
}
