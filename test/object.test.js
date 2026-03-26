import { expect } from "chai"
import at from "../src/at.js"
import get from "../src/get.js"

describe("Object tests", () => {

  /**
   * Unit tests for at.js
   */
  describe("at", () => {

    // --- Basic tests ---
    it("returns values at given paths", () => {
      const object = { a: [{ b: { c: 3 } }, 4] }
      const result = at(object, ["a[0].b.c", "a[1]"])

      expect(result).to.deep.equal([3, 4])
    })

    it("handles single path", () => {
      const object = { a: 1, b: 2 }

      const result = at(object, "a")

      expect(result).to.deep.equal([1])
    })

    it("handles multiple path arguments (not array)", () => {
      const object = { a: 1, b: 2 }

      const result = at(object, "a", "b")

      expect(result).to.deep.equal([1, 2])
    })

    // --- Edge cases ---
    it("returns undefined for non-existing paths", () => {
      const object = { a: 1 }

      const result = at(object, "b")

      expect(result).to.deep.equal([undefined])
    })

    it("handles nested paths that do not exist", () => {
      const object = { a: { b: 2 } }

      const result = at(object, "a.c.d")

      expect(result).to.deep.equal([undefined])
    })

    it("returns empty array when no paths are provided", () => {
      const object = { a: 1 }

      const result = at(object)

      expect(result).to.deep.equal([])
    })

    it("handles empty object", () => {
      const result = at({}, "a")

      expect(result).to.deep.equal([undefined])
    })

    it("handles array indices correctly", () => {
      const object = { a: [10, 20, 30] }

      const result = at(object, "a[1]")

      expect(result).to.deep.equal([20])
    })
  })

  /**
   * Unit tests for get.js
   */
describe("get", () => {
  const obj = { a: [{ b: { c: 3 } }] };

  // --- Basic tests ---
  it("gets a value using dot-notation path", () => {
    expect(get(obj, "a[0].b.c")).to.equal(3);
  })

  it("gets a value using array path", () => {
    expect(get(obj, ["a", "0", "b", "c"])).to.equal(3);
  })

  it("returns defaultValue when path resolves to undefined", () => {
    expect(get(obj, "a.b.c", "default")).to.equal("default");
  })

  // --- Edge cases ---
  it("returns undefined when path is missing and no default given", () => {
    expect(get(obj, "x.y.z")).to.be.undefined;
  })

  it("returns defaultValue when object is null", () => {
    expect(get(null, "a.b", 42)).to.equal(42);
  })

  it("does not return defaultValue when resolved value is null", () => {
    expect(get({ a: null }, "a", "fallback")).to.be.null;
  })
})
})