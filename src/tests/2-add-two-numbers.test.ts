import { test, describe } from 'node:test'
import assert from 'node:assert'
import { addTwoNumbers } from '../2-add-two-numbers.js'

test('Add Two Numbers', async (t) => {
  await t.test('should return the sum of two linked lists', () => {
    const l1 = [2, 4, 3]
    const l2 = [5, 6, 4]
    const output = [7, 0, 8]
    const result = addTwoNumbers(l1, l2)
    assert.deepStrictEqual(result, output)
  })
  await t.test('should handle 0 as input', () => {
    const l1 = [0]
    const l2 = [0]
    const output = [0]
    const result = addTwoNumbers(l1, l2)
    assert.deepStrictEqual(result, output)
  })
  await t.test('should handle different length inputs', () => {
    const l1 = [9, 9, 9, 9, 9, 9, 9]
    const l2 = [9, 9, 9, 9]
    const output = [8, 9, 9, 9, 0, 0, 0, 1]
    const result = addTwoNumbers(l1, l2)
    assert.deepStrictEqual(result, output)
  })
})
