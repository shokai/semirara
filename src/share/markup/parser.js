import {camelize} from "../string"

export const Parser = new class Parser{
  constructor(){
    this.replacers = []
  }

  parse(str){
    let nodes = toNodes(str)
    for(let m of this.replacers){
      nodes = m(nodes)
    }
    return nodes
  }

  addReplacer(replacer){
    if(typeof replacer !== "function") throw new Error("replacer must be a function")
    this[camelize(replacer.type)] = replacer
    this.replacers.push(replacer)
  }
}

export function flatten(arr){
  return Array.prototype.concat.apply([], arr)
}

export function toNodes(obj){
  if(obj instanceof Array){
    const invalid = obj.find(o => typeof o.type !== "string")
    if(invalid) throw new Error(`found invalid node - ${JSON.stringify(invalid)}`)
    return obj // valid Nodes
  }
  if(typeof obj === "string") return [createTextNode(obj)] // wrap Text to Nodes
  if(typeof obj === "object" && typeof obj.type === "string") return [obj] // wrap Node to Nodes
  throw new Error(`invalid source, cannot convert to Nodes. - ${JSON.stringify(obj)}`)
}

export function disableRegExpCapture(regexp, {replace, flags} = {}){
  if(!(regexp instanceof RegExp)) throw new Error("Invalid argument: not RegExp")
  let str = regexp.source.replace(/\((?!\?)/gm, "(?:")
  if(typeof replace === "function") str = replace(str)
  return new RegExp(str, flags)
}

export function createTextNode(value){
  if(typeof value !== "string") throw new Error("Invalid argument: not String")
  return {type: "text", value}
}

function createReplacer(type, regexp, toNode){
  function replacer(nodes){
    return flatten(nodes.map(node => {
      if(node.type !== "text") return node
      let splitter = disableRegExpCapture(regexp, {
        flags: "gmi", replace: src => `(${src})`
      })
      return node.value.split(splitter).map(chunk => {
        const m = chunk.match(regexp)
        if(m){
          const source = m.shift()
          return Object.assign({type, source}, toNode(...m))
        }
        return createTextNode(chunk)
      })
    })).filter(node => node.type !== "text" || node.value)
  }
  replacer.type = type
  return replacer
}

Parser.addReplacer(createReplacer(
  "strong",
  /\[{2}(.+)\]{2}/,
  (value) => ({value})
))

Parser.addReplacer(createReplacer(
  "external-link-with-image",
  /\[(https?:\/\/[^\s\]]+) (https?:\/\/[^\s\]]+\.(?:jpe?g|gif|png))\]/i,
  (link, image) => ({image, link})
))

Parser.addReplacer(createReplacer(
  "external-link-with-image-reverse",
  /\[(https?:\/\/[^\s\]]+\.(?:jpe?g|gif|png)) (https?:\/\/[^\s\]]+)\]/i,
  (image, link) => ({image, link, type: "external-link-with-image"})
))

Parser.addReplacer(createReplacer(
  "external-link-with-description",
  /\[(https?:\/\/[^\s\]]+) ([^\]]+)\]/,
  (link, description) => ({link, description})
))

Parser.addReplacer(createReplacer(
  "external-link-with-description-reverse",
  /\[([^\]]+) (https?:\/\/[^\s\]]+)\]/,
  (description, link) => ({link, description, type: 'external-link-with-description'})
))

Parser.addReplacer(createReplacer(
  "image",
  /\[(https?:\/\/[^\s\]]+\.(?:jpe?g|gif|png))\]/i,
  image => ({image})
))

Parser.addReplacer(createReplacer(
  "image-naked",
    /(?:^|\s)(https?:\/\/[^\s\]]+\.(?:jpe?g|gif|png))(?:$|\s)/i,
  image => ({image, type: 'image'})
))

Parser.addReplacer(createReplacer(
  "external-link",
  /\[(https?:\/\/[^\s\]]+)\]/,
  link => ({link})
))

Parser.addReplacer(createReplacer(
  "wiki-link",
  /\[([^\]]+)::\]/,
  wiki => ({wiki})
))

Parser.addReplacer(createReplacer(
  "wiki-title-link",
  /\[([^\]]+)::([^\]]*)\]/,
  (wiki, title) => ({wiki, title})
))

Parser.addReplacer(createReplacer(
  "title-link",
  /\[([^\]]+)\]/,
  title => ({title})
))

Parser.addReplacer(createReplacer(
  "title-link-hash",
  /(?:^|\s)\#([^\[\]\s]+)(?:$|\s)/,
  title => ({title})
))
