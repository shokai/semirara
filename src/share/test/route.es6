/* global describe it */

import {assert} from "chai";

import {buildPath, parseRoute, validateName, validateWiki, validateTitle, validateRoute} from "../route";

describe("route - parser and validator of /wiki/title path", function(){

  describe("buildPath", function(){

    it("build path from route", function(){
      assert.equal(buildPath({wiki: "foo", title: "bar"}), "/foo/bar");
    });

  });

  describe("parseRoute", function(){

    it("parse path", function(){
      assert.deepEqual(parseRoute("/foo/bar"), {wiki: "foo", title: "bar"});
      assert.deepEqual(parseRoute("foo/bar"), {});
      assert.deepEqual(parseRoute("/foo/bar/baz"), {wiki: "foo", title: "bar/baz"});
    });

  });

  describe("validateName - common rules for wiki & title", function(){

    it("invalid name", function(){
      assert(validateName(" head space").invalid);
      assert(validateName("tail space ").invalid);
      assert(validateName(null).invalid);
      assert(validateName(3).invalid);
      assert(validateName("").invalid);
      assert(validateName("#").invalid);
      assert(validateName("a"*65).invalid);
      assert(validateName("\n").invalid);
      assert(validateName("\r").invalid);
      assert(validateName("auth").invalid);
      assert(validateName("login").invalid);
      assert(validateName("logout").invalid);
      assert(validateName("api").invalid);
      assert(validateName("config").invalid);
      assert(validateName("%20").invalid);
      assert(validateName("%").invalid);
    });

    it("valid name", function(){
      assert(validateName("shokai").valid);
      assert(validateName("ホルモン かずすけ").valid);
      assert(validateName("3").valid);
      assert(validateName("general").valid);
      assert(validateName("logoff").valid);
      assert(validateName("logon").valid);
      assert(validateName("?_^+-*").valid);
    });
  });

  describe("validate wiki name", function(){

    it("invalid wiki", function(){
      assert(validateWiki("sl/ash").invalid);
      assert(validateWiki("javascript:").invalid);
    });

    it("valid name", function(){
      assert(validateWiki("general").valid);
    });

  });

  describe("validate page title", function(){

    it("invalid title", function(){
      assert(validateTitle("").invalid);
    });


    it("valid title", function(){
      assert(validateTitle("general").valid);
      assert(validateTitle("sl/ash").valid);
      assert(validateTitle("javascript:").valid);
    });

  });


  describe("validate route", function(){

    it("invalid route", function(){
      assert(validateRoute({wiki: "ok"}).invalid);
      assert(validateRoute({title: "ok"}).invalid);
      assert(validateRoute({wiki: "general", title: "sh#arp"}).invalid);
      assert(validateRoute({wiki: "sl/ash", title: "hello"}).invalid);
    });

    it("invalid route", function(){
      assert(validateRoute({wiki: "general", title: "hello"}).valid);
    });

  });

});
