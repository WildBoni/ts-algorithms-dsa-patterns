import { longestPalindrome } from '../5-longest-palindromic-substring.js'
import { test, describe } from 'node:test'
import assert from 'node:assert'

describe('longestPalindrome()', () => {
  test('should return the longest palindromic substring in s', () => {
    assert.strictEqual(longestPalindrome('babad'), 'bab')
    assert.strictEqual(longestPalindrome('cbbd'), 'bb')
  })
})
