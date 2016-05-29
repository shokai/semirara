/* global describe it */

import "./test_helper"
import {assert} from "chai"

import {disableRegExpCapture, flatten, toNodes, Parser} from "../parser"

describe("Parser - wiki syntax parser", function(){

  describe("utils", function(){
    describe("disableRegExpCapture", function(){
      it('should return new RegExp with replacing captures to "non-captureing parentheses"', function(){
        assert.regExpEqual(disableRegExpCapture(/[[(hello)]] (world|work)/)
                           , /[[(?:hello)]] (?:world|work)/
                           , "disable all captures")
        assert.regExpEqual(disableRegExpCapture(/[[(hello)]]/, {replace: str => `(${str})`})
                           , /([[(?:hello)]])/
                           , '"replace" option')
        assert.regExpEqual(disableRegExpCapture(/[[(image)\.(?:jpg|gif|png)]]/)
                           , /[[(?:image)\.(?:jpg|gif|png)]]/
                           , "disable only normal captures")
      })
    })

    describe("flatten", function(){
      it("should return flat array", function(){
        assert.deepEqual(flatten([1, 2, [3, 4], [5, 6]])
                         , [1, 2, 3, 4, 5, 6])
      })
    })

    describe("toNodes", function(){
      assert.deepEqual(toNodes("zanmai"), [
        {type: "text", value: "zanmai"}
      ])
    })
  })

  describe("replacers", function(){
    describe("title-link", function(){
      it("should parse [[title]]", function(){
        const nodes = Parser.titleLink(toNodes("hello [[shokai]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "title-link", title: "shokai", source: "[[shokai]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("title-link-hash", function(){
      it("should parse #title", function(){
        const nodes = Parser.titleLinkHash(toNodes("hello #shokai world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello"},
          {type: "title-link-hash", title: "shokai", source: " #shokai "},
          {type: "text", value: "world"}
        ])
      })
    })

    describe("wiki-title-link", function(){
      it("should parse [[wiki::title]]", function(){
        const nodes = Parser.wikiTitleLink(toNodes("hello [[shokai::test]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "wiki-title-link", wiki: "shokai", title: "test", source: "[[shokai::test]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("wiki-link", function(){
      it("should parse [[wiki::]]", function(){
        const nodes = Parser.wikiLink(toNodes("hello [[shokai::]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "wiki-link", wiki: "shokai", source: "[[shokai::]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("external-link-with-image", function(){
      it("should parse [[http://example.com http://example.com/image.jpg]]", function(){
        const nodes = Parser.externalLinkWithImage(toNodes("hello [[http://shokai.org https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "external-link-with-image", link: "http://shokai.org", image: "https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif", source: "[[http://shokai.org https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("external-link-with-image-reverse", function(){
      it("should parse [[http://example.com/image.jpg http://example.com]]", function(){
        const nodes = Parser.externalLinkWithImageReverse(toNodes("hello [[https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif http://shokai.org]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "external-link-with-image", link: "http://shokai.org", image: "https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif", source: "[[https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif http://shokai.org]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("external-link-with-description", function(){
      it("should parse [[http://example.com example site]]", function(){
        const nodes = Parser.externalLinkWithDescription(toNodes("hello [[http://example.com example site]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "external-link-with-description", link: "http://example.com", description: "example site", source: "[[http://example.com example site]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("external-link-with-description-reverse", function(){
      it("should parse [[example site http://example.com]]", function(){
        const nodes = Parser.externalLinkWithDescriptionReverse(toNodes("hello [[example site http://example.com]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "external-link-with-description", link: "http://example.com", description: "example site", source: "[[example site http://example.com]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("external-link", function(){
      it("should parse [[http://example.com]]", function(){
        const nodes = Parser.externalLink(toNodes("hello [[http://shokai.org]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "external-link", link: "http://shokai.org", source: "[[http://shokai.org]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("image", function(){
      it("should parse [[http://example.com/image.gif]]", function(){
        const nodes = Parser.image(toNodes("hello [[http://example.com/image.gif]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "image", image: "http://example.com/image.gif", source: "[[http://example.com/image.gif]]"},
          {type: "text", value: " world"}
        ])
      })
    })

    describe("strong", function(){
      it("should parse [[[text message]]]", function(){
        const nodes = Parser.strong(toNodes("hello [[[strong shokai]]] world"))
        assert.deepEqual(nodes, [
          {type: "text", value: "hello "},
          {type: "strong", value: "strong shokai", source: "[[[strong shokai]]]"},
          {type: "text", value: " world"}
        ])
      })
    })

  })

  describe("parse", function(){
    it("should parse link", function(){
      assert.deepEqual(Parser.parse("hello [[[world]]] [[shokai]][[http://shokai.org]] [[general::test]] [[ざんまい::]] かずすけ [[http://shokai.org https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif]][[http://example.com example site]][[http://example.com/image.PNG]]"), [
        {type: "text", value: "hello "},
        {type: "strong", value: "world", source: "[[[world]]]"},
        {type: "text", value: " "},
        {type: "title-link", title: "shokai", source: "[[shokai]]"},
        {type: "external-link", link: "http://shokai.org", source: "[[http://shokai.org]]"},
        {type: "text", value: " "},
        {type: "wiki-title-link", wiki: "general", title: "test", source: "[[general::test]]"},
        {type: "text", value: " "},
        {type: "wiki-link", wiki: "ざんまい", source: "[[ざんまい::]]"},
        {type: "text", value: " かずすけ "},
        {type: "external-link-with-image", link: "http://shokai.org", image: "https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif", source: "[[http://shokai.org https://gyazo.com/0ceeecc3c7d42e94a080e21f6a23f190.gif]]"},
        {type: "external-link-with-description", link: "http://example.com", description: "example site", source: "[[http://example.com example site]]"},
        {type: "image", image: "http://example.com/image.PNG", source: "[[http://example.com/image.PNG]]"}
      ])
    })
  })

})
