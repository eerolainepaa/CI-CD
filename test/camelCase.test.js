// src/camelCase.js

const { expect } = require("chai");
const { camelCase } = require("../src/camelCase");

describe('camelCase', () => {
  it.each([
    // Basic cases
    ['Foo Bar', 'fooBar'],
    ['foo bar', 'fooBar'],
    ['FOO BAR', 'fooBar'],

    // Kebab-case
    ['--foo-bar--', 'fooBar'],
    ['foo-bar', 'fooBar'],
    ['--FOO-BAR--', 'fooBar'],

    // snake_case
    ['__FOO_BAR__', 'fooBar'],
    ['foo_bar', 'fooBar'],
    ['FOO_BAR', 'fooBar'],

    // Mixed separators
    ['Foo-Bar_baz', 'fooBarBaz'],
    ['__foo__Bar--baz__', 'fooBarBaz'],
    ['hello_world-fooBar', 'helloWorldFooBar'],

    // Apostrophes and special quotes
    ["O'Reilly", 'oReilly'],
    ["don't stop believing", 'dontStopBelieving'],
    ['‘hello’ world', 'helloWorld'],
    ['"double quotes"', 'doubleQuotes'],

    // Single word
    ['foo', 'foo'],
    ['FOO', 'foo'],
    ['XmlHttpRequest', 'xmlHttpRequest'],

    // With numbers
    ['user2Login', 'user2Login'],
    ['HTTP2Server', 'http2Server'],
    ['foo123bar456', 'foo123bar456'],

    // Multiple spaces / punctuation
    ['  hello   world  ', 'helloWorld'],
    ['hello, world!', 'helloWorld'],
    ['hello...world', 'helloWorld'],
    ['API Response 2024', 'apiResponse2024'],

    // Edge cases
    ['', ''],
    ['   ', ''],

  ])('should convert "%s" → "%s"', (input, expected) => {
    expect(camelCase(input)).to.equal(expected)
  })

  // Additional tests for non-string values
  it.each([
    [null, ''],
    [undefined, ''],
    [0, ''],
    [false, ''],
    [123, '123'],
    [true, 'true'],
    [{}, 'objectobject'],        // Object.prototype.toString()
    [[], ''],                    // [].toString() === ''
  ])('should handle %s gracefully and return "%s"', (input, expected) => {
    expect(camelCase(input)).to.equal(expected)
  })
})