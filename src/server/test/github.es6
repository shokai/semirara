/* global describe it */

import {assert} from "chai";
import GitHub from "../lib/github";

describe("GitHub", function(){

  const github = new GitHub("foobarbaz");

  it('should have method "getUser"', function(){
    assert.isFunction(github.getUser);
  });

});
