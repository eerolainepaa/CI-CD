import { expect } from "chai"
import chunk from "../src/chunk.js"
import compact from "../src/compact.js"
import difference from "../src/difference.js"
import drop from "../src/drop.js"
import every from "../src/every.js"
import filter from "../src/filter.js"
import map from "../src/map.js"
import slice from "../src/slice.js"


describe("Array tests", () => {

  /**
   * Unit tests for chunk.js
   */
  describe("chunk", () => {
    
    // --- Basic tests ---
    it("handles even splitting", () => {
      const arr = ["a", "b", "c", "d"]
      expect(chunk(arr, 2)).to.deep.equal([["a", "b"], ["c", "d"]])
    })

    it("handles uneven splitting", () => {
      const arr2 = ["a", "b", "c", "d"]
      expect(chunk(arr2, 3)).to.deep.equal([["a", "b", "c"], ["d"]])
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
      expect(compact([0, 1, false, 2, "", 3])).to.deep.equal([1, 2, 3])
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
   * Unit tests for filter.js
   */
  describe("filter", () => {

    // --- Basic tests ---
    it("returns elements where predicate is truthy", () => {
      expect(filter([1, 2, 3, 4], x => x % 2 === 0)).to.deep.equal([2, 4])
    })

    it("returns empty array when no element match", () => {
      expect(filter([1, 2, 3, 4], x => x % 5 === 0)).to.deep.equal([])
    })

    it("returns all elements when all match", () => {
      expect(filter([2, 4, 6], x => x % 2 === 0)).to.deep.equal([2, 4, 6])
    })

    it("handles null array", () => {
      expect(filter(null, x => x)).to.deep.equal([])
    })

    it("filters objects by property (from docs example)", () => {
      const users = [
        { user: "barney", active: true },
        { user: "fred",   active: false },
      ]
      expect(filter(users, ({ active }) => active)).to.deep.equal([{user: "barney", active: true}])
    })
  })

  /**
   * Unit tests for map.js
   */
  describe("map", () => {

    // --- Basic tests ---
    it("iterates through the array correctly", () => {
      expect(map([4, 8], x => x + 2)).to.deep.equal([6, 10])
    })

    it("returns an array of the same length", () => {
      expect(map([1, 2, 3], n => n * 2)).to.have.lengthOf(3)
    })

    it("handles functions as second parameter", () => {
      function square(n) {
        return n * n
      }
      expect(map([4, 8], square)).to.deep.equal([16, 64])
    })

    it("returns a new array, not the original", () => {
      const arr = [1, 2, 3]
      const result = map(arr, n => n)
      expect(result).to.not.equal(arr)
    })

    it("handles an empty array", () => {
      expect(map([])).to.deep.equal([])
    })

    // --- Edge cases ---
    it("handles null", () => {
      expect(map(null, n => n)).to.deep.equal([])
    })
  })

  /**
   * Unit tests for slice.js
   */
  describe("slice", () => {

    // --- Basic tests ---
    it("slices from start to end of array when only start is given", () => {
      expect(slice([1, 2, 3, 4], 2)).to.deep.equal([3, 4])
    })

    it("slices from start up to but not including end", () => {
      expect(slice([1, 2, 3, 4], 1, 3)).to.deep.equal([2, 3])
    })

    it("returns a copy of the full array when no start or end given", () => {
      expect(slice([1, 2, 3, 4])).to.deep.equal([1, 2, 3, 4])
    })

    // Negative indices
    it("handles a negative start as offset from end", () => {
      expect(slice([1, 2, 3, 4], -2)).to.deep.equal([3, 4])
    })

    it("handles a negative end as offset from end", () => {
      expect(slice([1, 2, 3, 4], 0, -1)).to.deep.equal([1, 2, 3])
    })

    it("handles both negative start and negative end", () => {
      expect(slice([1, 2, 3, 4], -3, -1)).to.deep.equal([2, 3])
    })

    it("clamps negative start to 0 when offset exceeds array length", () => {
      expect(slice([1, 2, 3], -10)).to.deep.equal([1, 2, 3])
    })

    // Boundary conditions
    it("returns empty array when start equals end", () => {
      expect(slice([1, 2, 3], 2, 2)).to.deep.equal([])
    })

    it("returns empty array when start is greater than end", () => {
      expect(slice([1, 2, 3], 3, 1)).to.deep.equal([])
    })

    it("clamps end to array length when end exceeds it", () => {
      expect(slice([1, 2, 3], 0, 99)).to.deep.equal([1, 2, 3])
    })

    // Null / empty
    it("returns empty array for null input", () => {
      expect(slice(null)).to.deep.equal([])
    })

    it("returns empty array for empty array input", () => {
      expect(slice([])).to.deep.equal([])
    })

    // Returns new array
    it("returns a new array, not the original", () => {
      const arr = [1, 2, 3]
      expect(slice(arr, 0)).to.not.equal(arr)
    })
  })
})