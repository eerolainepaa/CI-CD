import { expect } from "chai"
import defaultTo from "../src/defaultTo.js"
import defaultToAny from "../src/defaultToAny.js"

describe("Util tests", () => {
  /**
   * Unit tests for defaultTo.js
   */
  describe("defaultTo", () => {

    // --- Basic tests ---
    it("returns the given int", () => {
      expect(defaultTo(1, 10)).to.equal(1)
    })

    it("returns the given string", () => {
      expect(defaultTo("foo", 10)).to.equal("foo")
    })

    it("returns the given array", () => {
      expect(defaultTo(["foo"], 10)).to.deep.equal(["foo"])
    })

    it("handles null", () => {
      expect(defaultTo(null, 10)).to.equal(10)
    })

    it("handles NaN", () => {
      expect(defaultTo(NaN, 10)).to.equal(10)
    })

    it("handles default parameters", () => {
      expect(defaultTo()).to.equal(undefined)
    })
  })

  /**
   * Unit tests for defaultToAny.js
   */
  describe("defaultToAny", () => {

    // --- Basic tests ---
    it("returns the given int", () => {
      expect(defaultToAny(1, 10, 5)).to.equal(1)
    })

    it("returns the given string", () => {
      expect(defaultToAny("foo", 10, 5)).to.equal("foo")
    })

    it("returns the given array", () => {
      expect(defaultToAny([4], 10, 5)).to.deep.equal([4])
    })

    it("returns first value", () => {
      expect(defaultToAny(undefined, 10, 5)).to.equal(10)
    })

    it("returns second value", () => {
      expect(defaultToAny(undefined, null, 5)).to.equal(5)
    })

    it("returns NaN", () => {
      expect(defaultToAny(undefined, null, NaN)).to.be.NaN
    })

  })
})