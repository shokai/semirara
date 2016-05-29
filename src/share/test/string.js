/* eslint-env mocha */

import {camelize} from "../string"
import {assert} from "chai"

describe("string", function(){

  describe("camelize", function(){
    it("should convert hyphen to camel", function(){
      assert.equal(camelize("click-to-start"), "clickToStart")
    })

    it("should convert sneak to camel", function(){
      assert.equal(camelize("to_string"), "toString")
    })
  })

})
