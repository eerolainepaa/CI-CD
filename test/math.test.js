import { expect } from "chai"
import add from "../src/add.js"
import divide from "../src/divide.js"
import ceil from "../src/ceil.js"
import clamp from "../src/clamp.js"

describe("Math tests", () => {
  /**
   * Unit tests for add.js
   */
  describe("add", () => {

    // --- Basic tests ---
    it("adds two positive numbers", () => {
      expect(add(5, 3)).to.equal(8)
    })

    it("adds positive and negative number", () => {
      expect(add(-5, 3)).to.equal(-2)
    })

    it("adds two negative numbers", () => {
      expect(add(-5, -3)).to.equal(-8)
    })

    it("adds zero to number", () => {
      expect(add(5, 0)).to.equal(5)
    })

    it("adds floating point numbers", () => {
      expect(add(1.1, 2.5)).to.equal(3.6)
    })


    // --- Edge cases ---
    it("returns 0 with default values", () => {
      expect(add()).to.equal(0)
    })

    it("returns the number itself when second argument is undefined", () => {
      expect(add(5, undefined)).to.equal(5)
    })

    it("returns the number itself when first argument is undefined", () => {
      expect(add(undefined, 5)).to.equal(5)
    })
  })

  /**
   * Unit tests for divide.js
   */
  describe("divide", () => {

    // --- Basic tests ---
    it("divides two whole numbers", () => {
      expect(divide(6, 4)).to.equal(1.5)
    })

    it("divides positive number with negative number", () => {
      expect(divide(6, -4)).to.equal(-1.5)
    })

    it("divides negative number with positive number", () => {
      expect(divide(-6, 4)).to.equal(-1.5)
    })

    it("divides negative number with negative number", () => {
      expect(divide(-6, -4)).to.equal(1.5)
    })

    // --- Edge Cases ---
    it("returns 1 with default values", () => {
      expect(divide()).to.equal(1)
    })

    it("returns the number itself when the second argument is undefined", () => {
      expect(divide(6,undefined)).to.equal(6)
    })

    it("returns the number itself when the first argument is undefined", () => {
      expect(divide(undefined,4)).to.equal(4)
    })
  })

  /**
   * Unit tests for ceil.js
   */
  describe("ceil", () => {

    // --- Basic tests ---
    it("rounds the number up", () => {
      expect(ceil(4.006)).to.equal(5)
    })

    it("rounds the number up with given precision", () => {
      expect(ceil(6.004, 2)).to.equal(6.01)
    })

    it("rounds number up with power of ten with negative precision", () => {
      expect(ceil(6040, -4)).to.equal(10000)
    })

    it("tekee jotain lisää", () => {
      expect(ceil(5, undefined)).to.equal(5)
    })

    // --- Edge cases ---
    it("returns the number itself when the second argument is undefined", () => {
      expect(ceil(6,undefined)).to.equal(6)
    })

    it("returns NaN when the first argument is undefined", () => {
      expect(ceil(undefined ,7)).to.be.NaN
    })

    it("returns NaN with default values", () => {
      expect(ceil()).to.be.NaN
    })
  })

  /**
   * Unit tests for clamp.js
   */
  describe("clamp", () => {

    // --- Basic tests ---
    it("doesn't clamp the number", () => {
      expect(clamp(5, 1, 10)).to.equal(5)
    })

    it("clamps the number to lower bound", () => {
      expect(clamp(-10, -5, 5)).to.equal(-5)
    })

    it("clamps the number to upper bound", () => {
      expect(clamp(10, -5, 5)).to.equal(5)
    })

    // --- Edge cases ---
    it("returns NaN with default values", () => {
      expect(clamp()).to.be.NaN
    })

    it("returns the number itself when the second and third argument is undefined", () => {
      expect(ceil(6,undefined, undefined)).to.equal(6)
    })
    it("returns NaN when the first is undefined", () => {
      expect(ceil(undefined,5, 15)).to.be.NaN
    })
  })

})