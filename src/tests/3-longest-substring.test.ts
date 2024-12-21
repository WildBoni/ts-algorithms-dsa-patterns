import { lengthOfLongestSubstring } from '../3-longest-substring.js'
import { test, describe } from 'node:test'
import assert from 'node:assert'

describe('3-longest-substring', () => {
  test('lengthOfLongestSubstring with abcabcbb', () => {
    assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3)
  })

  test('lengthOfLongestSubstring with bbbbb', () => {
    assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1)
  })

  test('lengthOfLongestSubstring with pwwkew', () => {
    assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3)
  })
})
