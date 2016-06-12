const debug = require("../../share/debug")(__filename)

import {validateTitle, validateWiki, validateRoute} from "../../share/route"
import {Parser} from '../../share/markup/parser'

import {ambiguous} from "./"
import Cache from "../lib/cache"
const pageCache = new Cache({
  prefix: "page",
  expire: 60*60 // 60min
})

import mongoose from "mongoose"
import autoIncrement from "mongoose-auto-increment"
autoIncrement.initialize(mongoose.connection)

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: (title) => validateTitle(title).valid
  },
  wiki: {
    type: String,
    required: true,
    validate: (wiki) => validateWiki(wiki).valid
  },
  image: {
    type: String,
    validate: (url) => /^https?:\/\/.+/.test(url)
  },
  lines: {
    type: Array,
    default: [ ],
    required: true
  },
  innerLinks: {
    type: Array,
    default: [ ]
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
})

pageSchema.pre("save", function(next){
  this.updatedAt = Date.now()
  this.lines = this.lines
    .map(line => {
      line.value = line.value.trim()
      return line
    })
    .filter(line => line.value.length > 0)
  next()
})

pageSchema.pre("save", function(next){
  this.image = (() => {
    for(let line of this.lines){
      for(let node of Parser.parse(line.value)){
        if(/image/.test(node.type)){
          return node.image
        }
      }
    }
  })()
  next()
})

pageSchema.plugin(autoIncrement.plugin, {
  model: "Page",
  field: "number",
  startAt: 1
})

pageSchema.post("save", function(page){
  debug(`save!  ${page.wiki}::${page.title}`)
  pageCache.set(`${this.wiki}::${this.title}`, this.toHash())
  if(page.lines.length < 1){
    Page.emit("remove", page)
  }
  else{
    Page.emit("update", page)
  }
})

pageSchema.statics.findNotEmpty = function(...args){
  args[0].lines = {$ne: []}
  return this.find(...args)
}

pageSchema.statics.findPagesByWiki = function(wiki){
  return Page.findNotEmpty({wiki}, 'title image', {sort: {updatedAt: -1}})
}

pageSchema.statics.findOneByWikiTitle = async function(query){
  const {wiki, title} = query
  return await pageCache.get(`${wiki}::${title}`) || this.findOne(ambiguous(query))
}

const saveTimeouts = {}
pageSchema.methods.saveWithCache = function(){
  const validationResult = validateRoute(this)
  if(validationResult.invalid) throw new Error(validationResult.errors)
  const key = `${this.wiki}::${this.title}`
  clearTimeout(saveTimeouts[key])
  pageCache.set(key, this.toHash())
  saveTimeouts[key] = setTimeout(this.save, 20000)
}

pageSchema.methods.rename = async function(newTitle){
  const {wiki, title} = this
  if((await Page.count({wiki, title: newTitle})) > 0){
    throw new Error("page exists")
  }
  Page.emit("remove", this)
  const cache = await pageCache.get(`${wiki}::${title}`)
  if(cache){
    this.lines = cache.lines
  }
  this.title = newTitle

  pageCache.delete(`${wiki}::${title}`)
  await this.save()
  return {wiki, title: newTitle}
}

pageSchema.methods.toHash = function(){
  return {
    wiki: this.wiki,
    title: this.title,
    image: this.image,
    number: this.number,
    lines: this.lines,
    indent: this.indent,
    updatedAt: this.updatedAt,
    createdAt: this.createdAt
  }
}

const Page = mongoose.model("Page", pageSchema)
