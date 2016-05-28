import {assert} from "chai"

assert.regExpEqual = function(a, b, msg){
  if(!(a instanceof RegExp && b instanceof RegExp)) throw new Error("Argument error: not RegExp")
  return this.equal(a.source, b.source, msg)
}
