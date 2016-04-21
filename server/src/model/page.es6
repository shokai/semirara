const debug = require("debug")("semirara:model:page");

import mongoose from "mongoose";

import clone from "clone";

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

pageSchema.statics.findOneAmbiguous = function(query, ...args){
  for(let k in query){
    let v = query[k];
    if(typeof v === "string"){
      v = v.replace(/\s/g, "").split('').join(' ?'); // spaces
      v = v.replace(/[\\\+\*\.\[\]\{\}\(\)\^\|]/g, c => `\\${c}`); // replace regex
      v = v.replace(" ??", " ?\\?");
      v = new RegExp(`^${v}$`, "i");
      query[k] = v;
    }
  }
  return this.findOne.apply(this, [query, ...args]);
};

const Page = mongoose.model("Page", pageSchema);

export function isValidPageId(_id){
  return typeof _id === "number" && _id > 0;
}
