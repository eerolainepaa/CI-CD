import { expect } from "chai"
import chunk from "../src/chunk.js"
import compact from "../src/compact.js"
import difference from "../src/difference.js"
import drop from "../src/drop.js"
import every from "../src/every.js"


describe("Array tests", () => {

  /**
   * Unit tests for chunk.js
   */
  describe("chunk", () => {
    
    // --- Basic tests ---
    it("handles even splitting", () => {
      const arr = ['a', 'b', 'c', 'd']
      expect(chunk(arr, 2)).to.deep.equal([['a', 'b'], ['c', 'd']])
    })

    it("handles uneven splitting", () => {
      const arr2 = ['a', 'b', 'c', 'd']
      expect(chunk(arr2, 3)).to.deep.equal([['a', 'b', 'c'], ['d']])
    })

    it("handles empty array", () => {
      expect(chunk([],4)).to.deep.equal([])
    })

    // --- Edge cases ---
    it("handles null", () => {
      expect(chunk(null,4)).to.deep.equal([])
    })
  })

  /**
   * Unit tests for compact.js
   */
  describe("compact", () => {

    // --- Basic tests ---
    it("handles array with no falsey", () => {
      expect(compact([1, 2, 3])).to.deep.equal([1, 2, 3])
    })

    it("handles array with falsey", () => {
      expect(compact([0, 1, false, 2, '', 3])).to.deep.equal([1, 2, 3])
    })

    it("handles empty array", () => {
      expect(compact([])).to.deep.equal([])
    })
  })

  /**
   * Unit tests for difference.js
   */
  describe("difference", () => {

    // --- Basic tests ---
    it("returns values not in second array", () => {
      expect(difference([2, 1, 4], [2, 3])).to.deep.equal([1, 4])
    })

    it("returns empty array", () => {
      expect(difference([2, 3], [2, 3, 4])).to.deep.equal([])
    })

    it("handles empty arrays", () => {
      expect(difference([], [])).to.deep.equal([])
    })

    it("handles multiple arrays", () => {
      expect(difference([5, 1, 7, 3], [1, 2, 3], [4, 5, 6])).to.deep.equal([7])
    })
  })

  /**
   * Unit tests for drop.js
   */
  describe("drop", () => {

    // --- Basic tests ---
    it("drops the first element with no second parameter", () => {
      expect(drop([1, 2, 3])).to.deep.equal([2, 3])
    })

    it("drops the given amount of elements", () => {
      expect(drop([1, 2, 3], 2)).to.deep.equal([3])
    })

    it("doesn't drop elements", () => {
      expect(drop([1, 2, 3], 0)).to.deep.equal([1, 2, 3])
    })

    it("handles empty array", () => {
      expect(drop([], 2)).to.deep.equal([])
    })

    // --- Edge cases ---
    it("handles null", () => {
      expect(drop(null, 2)).to.deep.equal([])
    })
  })

  /**
   * Unit tests for every.js
   */
  describe("every", () => {

    // --- Basic tests
    it("returns true when all elements pass the predicate", () => {
      expect(every([2, 4, 6], n => n%2 === 0)).to.be.true
    })
    it("returns false when some elements fail the predicate", () => {
    expect(every([2, 3, 6], n => n % 2 === 0)).to.be.false
    })

    it("returns false when all elements fail the predicate", () => {
      expect(every([1, 3, 5], n => n % 2 === 0)).to.be.false
    })

    it("works with Boolean as predicate", () => {
      expect(every([true, 1, "yes"], Boolean)).to.be.true
      expect(every([true, 1, null, "yes"], Boolean)).to.be.false
    })

    // --- Predicate arguments ---
    it("stops iterating once predicate returns false", () => {
      let count = 0
      every([1, 2, 3, 4], n => { count++; return n < 2 })
      expect(count).to.equal(2)
    })

    // --- Edge cases ---
    it("returns true for empty array", () => {
      expect(every([], Boolean)).to.be.true
    })

    it("returns true for null array", () => {
      expect(every(null, Boolean)).to.be.true
    })

    it("handles single element array", () => {
      expect(every([1], n => n > 0)).to.be.true
      expect(every([0], n => n > 0)).to.be.false
    })
  })

  /**
   * 
   */
})