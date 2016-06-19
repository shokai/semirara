const debug = require("../../share/debug")(__filename)

import {uniq} from "lodash"
import {validateTitle, validateWiki, validateRoute} from "../../share/route"
import {Parser} from '../../share/markup/parser'

import {ambiguous} from "./"

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
  this.image = null
  this.innerLinks = []
  for(let line of this.lines){
    for(let node of Parser.parse(line.value)){
      if(!this.image && /image/.test(node.type)){
        debug("found image", node.image)
        this.image = node.image
        break
      }
      if(/^title\-link/.test(node.type)){
        this.innerLinks.push(node.title)
      }
    }
  }
  this.innerLinks = uniq(this.innerLinks)
  next()
})

pageSchema.plugin(autoIncrement.plugin, {
  model: "Page",
  field: "number",
  startAt: 1
})

pageSchema.post("save", function(page){
  debug(`save!  ${page.wiki}::${page.title}`)
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

pageSchema.statics.findOneByWikiTitle = function(query){
  const {wiki, title} = query
  return this.findOne(ambiguous(query))
}

pageSchema.methods.findReverseLinkedPages = function(selector = "title image"){
  return Page.find({innerLinks: {$in: [this.title]}}, selector)
}

const saveTimeouts = {}
pageSchema.methods.saveLater = function(){
  const validationResult = validateRoute(this)
  if(validationResult.invalid) throw new Error(validationResult.errors)
  const key = `${this.wiki}::${this.title}`
  clearTimeout(saveTimeouts[key])
  saveTimeouts[key] = setTimeout(this.save, 20000)
}

pageSchema.methods.rename = async function(newTitle){
  const {wiki, title} = this
  if((await Page.count({wiki, title: newTitle})) > 0){
    throw new Error("page exists")
  }
  Page.emit("remove", this)
  this.title = newTitle
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
