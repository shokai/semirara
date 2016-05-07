/* global describe it */

import {delay} from "./test_helper";
import {assert} from "chai";
import Cache from "../lib/cache";


describe("Cache", function(){

  const cache = new Cache({prefix: "test", expire: 1});

  it('should have method "set"', function(){
    assert.isFunction(cache.set);
  });

  it('should have method "get"', function(){
    assert.isFunction(cache.get);
  });

  describe('set then get', function(){

    this.timeout(5000);

    it("should get same value", async function(){
      await cache.set("name", "shokai");
      const res = await cache.get("name");
      assert.equal(res, "shokai");
    });

    it("should expire in 1 sec", async function(){
      await cache.set("name", "shokai");
      await delay(1500); // wait for expire
      const res = await cache.get("name");
      assert.equal(res, null);
    });

  });

  describe('delete', function(){
    this.timeout(1000);

    it("should delete value", async function(){
      await cache.set("name", "shokai");
      await cache.delete("name");
      const name = await cache.get("name");
      assert.equal(name, null);
    });
  });
});
