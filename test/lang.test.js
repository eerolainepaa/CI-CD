import { expect } from "chai"
import toInteger from "../src/toInteger.js"
import castArray from "../src/castArray.js"
import eq from "../src/eq.js"
import isArguments from "../src/isArguments.js"
import isArrayLike from "../src/isArrayLike.js"
import isArrayLikeObject from "../src/isArrayLikeObject.js"
import isBoolean from "../src/isBoolean.js"
import isBuffer from "../src/isBuffer.js"
import isDate from "../src/isDate.js"
import isObjectLike from "../src/isObjectLike.js"
import isEmpty from "../src/isEmpty.js"

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
      expect(castArray({"a" : 1})).to.deep.equal([{"a" : 1}])
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
      expect(toInteger("3.2")).to.equal(3)
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

  /**
   * Unit tests for isArguments.js
   */
  describe("isArguments", () => {

    // --- Basic tests ---
    it("returns true for an arguments object", () => {
      expect(isArguments((function () { return arguments })())).to.be.true
    })

    it("returns false for a plain array", () => {
      expect(isArguments([1, 2, 3])).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isArguments(null)).to.be.false
    })

    it("returns false for a plain object", () => {
      expect(isArguments({ length: 1, 0: "a" })).to.be.false
    })
  })

  /**
   * Unit tests for isArrayLike.js
   */
  describe("isArrayLike", () => {

    // --- Basic tests ---
    it("returns true for arrays", () => {
      expect(isArrayLike([1, 2, 3])).to.be.true
    })

    it("returns true for strings", () => {
      expect(isArrayLike("abc")).to.be.true
    })

    it("returns true for array-like objects with valid length", () => {
      expect(isArrayLike({ length: 2 })).to.be.true
    })

    it("returns false for functions", () => {
      expect(isArrayLike(Function)).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isArrayLike(null)).to.be.false
    })

    it("returns false for plain objects without length", () => {
      expect(isArrayLike({ a: 1 })).to.be.false
    })
  })

  /**
   * Unit tests for isArerayLikeObject.js
   */
  describe("isArrayLikeObject", () => {

    // --- Basic tests ---
    it("returns true for arrays", () => {
      expect(isArrayLikeObject([1, 2, 3])).to.be.true
    })

    it("returns false for strings (not objects)", () => {
      expect(isArrayLikeObject("abc")).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isArrayLikeObject(null)).to.be.false
    })

    it("returns false for functions", () => {
      expect(isArrayLikeObject(Function)).to.be.false
    })
  })

  /**
   * Unit tests for isBoolean.js
   */
  describe("isBoolean", () => {

    // --- Basic tests ---
    it("returns true for literal true", () => {
      expect(isBoolean(true)).to.be.true
    })

    it("returns true for literal false", () => {
      expect(isBoolean(false)).to.be.true
    })

    it("returns true for Boolean object", () => {
      expect(isBoolean(new Boolean(true))).to.be.true
    })

    it("returns false for null", () => {
      expect(isBoolean(null)).to.be.false
    })

    it("returns false for 0", () => {
      expect(isBoolean(0)).to.be.false
    })

    it("returns false for a string", () => {
      expect(isBoolean("true")).to.be.false
    })
  })

  /**
   * Unit tests for isBuffer.js
   */
  describe("isBuffer", () => {

    // --- Basic tests ---
    // isBuffer falls back to () => false in ESM because the CommonJS
    // module detection (freeModule/freeExports) doesn"t work with ES modules.
    // Buffer.isBuffer(buf) would return true, but nativeIsBuffer is never assigned.
    it("returns true for a Buffer", () => {
      expect(isBuffer(new Buffer(2))).to.be.true
    })

    it("returns true for a Buffer with content", () => {
      expect(isBuffer(new Buffer("hello"))).to.be.true
    })

    it("returns false for a Uint8Array", () => {
      expect(isBuffer(new Uint8Array(2))).to.be.false
    })

    it("returns false for an array", () => {
    expect(isBuffer([1, 2, 3])).to.be.false
    })

    it("returns false for a string", () => {
      expect(isBuffer("hello")).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isBuffer(null)).to.be.false
    })

    it("returns false for a plain object", () => {
      expect(isBuffer({ length: 2 })).to.be.false
    })

    it("returns false for undefined", () => {
      expect(isBuffer(undefined)).to.be.false
    })
  })

  /**
   * Unit tests for isDate.js
   */
  describe("isDate", () => {

    // --- Basic tests ---
    it("returns true for a Date object", () => {
      expect(isDate(new Date())).to.be.true
    })

    it("returns true for a Date constructed with a specific date", () => {
      expect(isDate(new Date("2012-04-23"))).to.be.true
    })

    it("returns true for an invalid Date object", () => {
      // Still a Date object, even if the value is NaN
      expect(isDate(new Date("not-a-date"))).to.be.true
    })

    it("returns false for a date string", () => {
      expect(isDate("Mon April 23 2012")).to.be.false
    })

    it("returns false for a timestamp number", () => {
      expect(isDate(Date.now())).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isDate(null)).to.be.false
    })

    it("returns false for a plain object", () => {
      expect(isDate({ date: new Date() })).to.be.false
    })

    it("returns false for undefined", () => {
      expect(isDate(undefined)).to.be.false
    })
  })

  /**
   * Unit tests for isObjectLike.js
   */
  describe("isObjectLike", () => {

    // --- Basic tests ---
    it("returns true for objects", () => {
      expect(isObjectLike({})).to.be.true
    })

    it("returns true for array", () => {
      expect(isObjectLike([1, 2, 3])).to.be.true
    })

    it("returns true for a Date object", () => {
      expect(isObjectLike(new Date())).to.be.true
    })

    it("returns false for a function", () => {
      expect(isObjectLike(Function)).to.be.false
    })

    // --- Edge cases ---
    it("returns false for null", () => {
      expect(isObjectLike(null)).to.be.false
    })

    it("returns false for undefined", () => {
      expect(isObjectLike(undefined)).to.be.false
    })
  })

  /**
   * Unit tests for isEmpty.js
   */
  describe("isEmpty", () => {
    // Nullish
    it("returns true for null", () => {
      expect(isEmpty(null)).to.be.true
    })

    it("returns true for undefined", () => {
      expect(isEmpty(undefined)).to.be.true
    })

    // Primitives (non-array-like)
    it("returns true for true", () => {
      expect(isEmpty(true)).to.be.true
    })

    it("returns true for false", () => {
      expect(isEmpty(false)).to.be.true
    })

    it("returns true for a number", () => {
      expect(isEmpty(1)).to.be.true
    })

    // Arrays
    it("returns true for an empty array", () => {
      expect(isEmpty([])).to.be.true
    })

    it("returns false for a non-empty array", () => {
      expect(isEmpty([1, 2, 3])).to.be.false
    })

    // Strings
    it("returns true for an empty string", () => {
      expect(isEmpty("")).to.be.true
    })

    it("returns false for a non-empty string", () => {
      expect(isEmpty("abc")).to.be.false
    })

    // Objects
    it("returns true for an empty object", () => {
      expect(isEmpty({})).to.be.true
    })

    it("returns false for a non-empty object", () => {
      expect(isEmpty({ a: 1 })).to.be.false
    })

    // Maps
    it("returns true for an empty Map", () => {
      expect(isEmpty(new Map())).to.be.true
    })

    it("returns false for a non-empty Map", () => {
      const map = new Map()
      map.set("a", 1)
      expect(isEmpty(map)).to.be.false
    })

    // Sets
    it("returns true for an empty Set", () => {
      expect(isEmpty(new Set())).to.be.true
    })

    it("returns false for a non-empty Set", () => {
      expect(isEmpty(new Set([1, 2, 3]))).to.be.false
    })

    // Typed arrays
    it("returns true for an empty Uint8Array", () => {
      expect(isEmpty(new Uint8Array(0))).to.be.true
    })

    it("returns false for a non-empty Uint8Array", () => {
      expect(isEmpty(new Uint8Array([1, 2, 3]))).to.be.false
    })

    // Arguments
    it("returns true for an empty arguments object", () => {
      expect(isEmpty((function() { return arguments })())).to.be.true
    })

    it("returns false for a non-empty arguments object", () => {
      expect(isEmpty((function() { return arguments })(1, 2))).to.be.false
    })

    // Functions
    it("returns true for a function", () => {
      expect(isEmpty(function() {})).to.be.true
    })
  })
})