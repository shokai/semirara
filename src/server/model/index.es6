import mongoose from "mongoose"
import "./user"
import "./page"

const url =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/semirara'

export default {
  connect: function(){
    return mongoose.connect(url)
  }
}


export function ambiguous(query){
  for(let k in query){
    let v = query[k]
    if(typeof v === "string"){
      v = v.replace(/\s/g, "").split('').join(' ?') // spaces
      v = v.replace(/[\\\+\*\.\[\]\{\}\(\)\^\|]/g, c => `\\${c}`) // replace regex
      v = v.replace(" ??", " ?\\?")
      v = v.replace(/^\?/, "\\?")
      v = new RegExp(`^${v}$`, "i")
      query[k] = v
    }
  }
  return query
}
