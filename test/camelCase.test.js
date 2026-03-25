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
})