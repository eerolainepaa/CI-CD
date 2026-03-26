import { expect } from "chai"
import camelCase from "../src/camelCase.js"
import capitalize from "../src/capitalize.js"
import upperFirst from "../src/upperFirst.js"
import endsWith from "../src/endsWith.js"

describe("String tests", () => {

  /**
   * Unit tests for camelCase.js
   */
  describe("camelCase", () => {

    // --- Basic tests ---
    it("converts space-separated word", () => {
      expect(camelCase("Foo Bar")).to.equal("fooBar")
    })

    it("converts kebab-case", () => {
      expect(camelCase("--foo-bar--")).to.equal("fooBar")
    })

    it("converts snake_case with caps", () => {
      expect(camelCase("__FOO_BAR__")).to.equal("fooBar")
    })

    // --- Edge cases ---
    it("returns empty string for empty input", () => {
      expect(camelCase("")).to.equal("")
    })

    it("returns empty string for null input", () => {
      expect(camelCase(null)).to.equal("null")
    })

    it("handles a single lowercase word", () => {
      expect(camelCase("foo")).to.equal("foo")
    })

    it("handles already camelCased input", () => {
      expect(camelCase("fooBar")).to.equal("fooBar")
    })

    it("handles all uppercase single word", () => {
      expect(camelCase("FOO")).to.equal("foo")
    })

    it("strips unicode right single quotation mark (u2019)", () => {
      expect(camelCase("it\u2019s a test")).to.equal("itsATest")
    })

    it("strips regular apostrophes before processing", () => {
      expect(camelCase("it's fine")).to.equal("itsFine")
    })

    it("handles multiple spaces between words", () => {
      expect(camelCase("foo   bar")).to.equal("fooBar")
    })

    it("handles mixed delimiters (hyphens and underscores)", () => {
      expect(camelCase("foo-bar_baz")).to.equal("fooBarBaz")
    })

    it("handles numbers mixed with words", () => {
      expect(camelCase("foo2bar")).to.equal("foo2Bar")
    })
  })

  /**
   * Unit tests for capitalize.js
   */
  describe("capitalize", () => {

    //--- Basic tests ---
    it("converts lowercase word", () => {
      expect(capitalize("foo")).to.equal("Foo")
    })

    it("handles capitalized word", () => {
      expect(capitalize("FOO")).to.equal("Foo")
    })

    it("handles word with mixed lower and uppercase", () => {
      expect(capitalize("FoObaR")).to.equal("Foobar")
    })

    // --- Edge cases ---
    it("returns empty string for empty input", () => {
      expect(capitalize("")).to.equal("")
    })

    it("returns string 'Null' for null input", () => {
      expect(capitalize(null)).to.equal("Null")
    })
  })

  /**
   * Unit tests for upperFirst.js
   */
  describe("upperFirst", () => {

    // --- Basic tests ---
    it("converts lowercase string", () => {
      expect(upperFirst("foobar")).to.equal("Foobar")
    })

    it("handles uppercase string", () => {
      expect(upperFirst("FOOBAR")).to.equal("FOOBAR")
    })

    it("returns empty string for empty string", () => {
      expect(upperFirst("")).to.equal("")
    })

    // -- Edge cases ---
    it("returns empty string with default parameters", () => {
      expect(upperFirst()).to.equal("")
    })
  })

  /**
   * Unit tests for endsWith
   */
  describe("endsWith", () => {

    // --- Basic tests ---
    it("returns true", () => {
      expect(endsWith("abc", "c")).to.be.true
    })

    it("returns false", () => {
      expect(endsWith("abc", "d")).to.be.false
    })

    it("handles position parameter", () => {
      expect(endsWith("abcde", "d", 4)).to.be.true
    })

    it("handles negative position parameter", () => {
      expect(endsWith("abcde", "a", -4)).to.be.false
    })

    it("handles too big position parameter", () => {
      expect(endsWith("abcde", "e", 9999)).to.be.true
    })
  })
})
