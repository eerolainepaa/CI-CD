import { expect } from "chai"
import toInteger from "../src/toInteger.js"
import castArray from "../src/castArray.js"
import eq from "../src/eq.js"

describe("Language tests", () => {

    /**
   * Unit tests for castArray.js
   */
  describe("castArray", () => {

    // --- Basic tests ---
    it("handles integers", () => {
      expect(castArray(1)).to.deep.equal([1])
    })

    it("handles strings", () => {
      expect(castArray("abc")).to.deep.equal(["abc"])
    })

    it("handles objecs", () => {
      expect(castArray({'a' : 1})).to.deep.equal([{'a' : 1}])
    })

    // -- Edge cases ---
    it("handles null", () => {
      expect(castArray(null)).to.deep.equal([null])
    })

    it("handles undefined", () => {
      expect(castArray(undefined)).to.deep.equal([undefined])
    })

    it("handles empty parameters", () => {
      expect(castArray()).to.deep.equal([])
    })
  })

  /**
   * Unit tests for toInteger.js
   */
  describe("toInteger", () => {

    // --- Basic tests ---
    it("handles float", () => {
      expect(toInteger(3.9)).to.equal(3)
    })

    it("handles Infinity", () => {
      expect(toInteger(Infinity)).to.equal(1.7976931348623157e+308)
    })

    it("handles Number.MIN_VALUE", () => {
      expect(toInteger(Number.MIN_VALUE)).to.equal(0)
    })

    it("handles negative numbers", () => {
      expect(toInteger(-4)).to.equal(-4)
    })

    it("handles string", () => {
      expect(toInteger('3.2')).to.equal(3)
    })
  })

  /**
   * Unit tests for eq.js
   */
  describe("eq", () => {

    // --- Basic tests ---
    it("correctly compares same object", () => {
      const object = { "a" : 1 }
      expect(eq(object, object)).to.be.true
    })

    it("correctly compares different objects", () => {
      const object = { "a" : 1 }
      const other = {"a" : 1 }
      expect(eq(object, other)).to.be.false
    })

    it("correctly compares strings", () => {
      expect(eq("object", "other")).to.be.false
    })

    it("correctly compares strings", () => {
      expect(eq("object", "object")).to.be.true
    })
    
    it("correctly compares integers", () => {
      expect(eq(1, 1)).to.be.true
    })

    it("handles NaN", () => {
      expect(eq(NaN, NaN)).to.be.true
    })
  })
})