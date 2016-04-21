const debug = require("debug")("semirara:model:page");

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

const Page = mongoose.model("Page", pageSchema);
