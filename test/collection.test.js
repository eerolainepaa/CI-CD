import { expect } from "chai"
import countBy from "../src/countBy.js"

describe("Collection tests", () => {
  /**
   * Unit tests for countBy.js
   */
  describe("countBy", () => {

    // --- Basic tests ---
    it("handles mixed bools", () => {
      const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'betty', 'active': true },
        { 'user': 'fred', 'active': false }
      ]
      expect(countBy(users, value => value.active)).to.deep.equal({"true": 2, "false": 1})
    })

    it("handles all true", () => {
      const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'betty', 'active': true },
        { 'user': 'fred', 'active': true }
      ]
      expect(countBy(users, value => value.active)).to.deep.equal({"true": 3})
    })

    it("handles all false", () => {
      const users = [
        { 'user': 'barney', 'active': false },
        { 'user': 'betty', 'active': false },
        { 'user': 'fred', 'active': false }
      ]
      expect(countBy(users, value => value.active)).to.deep.equal({"false": 3})
    })
  })
})