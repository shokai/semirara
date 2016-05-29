/* eslint-env mocha */

import {renderToJSX} from "../render"
import {assert} from "chai"

describe("renderToJSX(node)", function(){

  it("render type:text", function(){
    const vdom = renderToJSX({type: "text", value: "hello world"})
    assert.equal(vdom.type, "span")
    assert.equal(vdom.props.children, "hello world")
  })

  it("render type:strong", function(){
    const vdom = renderToJSX({type: "strong", value: "strong world"})
    assert.equal(vdom.type, "strong")
    assert.equal(vdom.props.children, "strong world")
  })

  it("render type:image", function(){
    const vdom = renderToJSX({type: "image", image: "http://example.com/foo.jpg"})
    assert.equal(vdom.type, "img")
    assert.equal(vdom.props.src, "http://example.com/foo.jpg")
  })

  it("render type:external-link", function(){
    const vdom = renderToJSX({type: "external-link", link: "http://shokai.org"})
    assert.equal(vdom.type, "a")
    assert.equal(vdom.props.href, "http://shokai.org")
    assert.equal(vdom.props.children, "http://shokai.org")
  })

  it("render type:external-link-with-description", function(){
    const vdom = renderToJSX({type: "external-link-with-description", link: "http://shokai.org", description: "橋本商会"})
    assert.equal(vdom.type, "a")
    assert.equal(vdom.props.href, "http://shokai.org")
    assert.equal(vdom.props.children, "橋本商会")
  })

  it("render type:external-link-with-image", function(){
    const vdom = renderToJSX({type: "external-link-with-image", link: "http://shokai.org", image: "http://example.com/foo.png"})
    assert.equal(vdom.type, "a")
    assert.equal(vdom.props.href, "http://shokai.org")
    assert.equal(vdom.props.children.type, "img")
    assert.equal(vdom.props.children.props.src, "http://example.com/foo.png")
  })

})
