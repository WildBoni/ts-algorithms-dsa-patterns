import { test, describe } from 'node:test'
import assert from 'node:assert'
import {
  addTwoNumbers,
  convertNumbersArrayToLinkedList,
} from '../2-add-two-numbers.js'

describe('Correctly converts numbers array to linked list', () => {
  test('Converts [2, 4, 9] to linked list', () => {
    const l1 = [2, 4, 9]
    const result = convertNumbersArrayToLinkedList(l1)
    assert.deepStrictEqual(result, {
      val: 2,
      next: {
        val: 4,
        next: {
          val: 9,
          next: null,
        },
      },
    })
  })
})

describe('Correctly adds two numbers', () => {
  test('Adds linked lists [2, 4, 9] and [5, 6, 4, 9]', () => {
    const ll1 = { val: 2, next: { val: 4, next: { val: 9, next: null } } }
    const ll2 = {
      val: 5,
      next: { val: 6, next: { val: 4, next: { val: 9, next: null } } },
    }

    const result = addTwoNumbers(ll1, ll2)
    assert.deepStrictEqual(result, {
      val: 7,
      next: {
        val: 0,
        next: {
          val: 4,
          next: {
            val: 0,
            next: {
              val: 1,
              next: null,
            },
          },
        },
      },
    })
  })
})

describe('Correctly creates linked list and adds numbers', () => {
  test('Adds numbers [2, 4, 9] and [5, 6, 4, 9]', () => {
    const l1 = [2, 4, 9]
    const l2 = [5, 6, 4, 9]
    let ll1 = convertNumbersArrayToLinkedList(l1)
    let ll2 = convertNumbersArrayToLinkedList(l2)
    let result = addTwoNumbers(ll1, ll2)
    assert.deepStrictEqual(result, {
      val: 7,
      next: {
        val: 0,
        next: {
          val: 4,
          next: {
            val: 0,
            next: {
              val: 1,
              next: null,
            },
          },
        },
      },
    })
  })

  test('Adds numbers [0] and [0]', () => {
    const l1 = [0]
    const l2 = [0]
    let ll1 = convertNumbersArrayToLinkedList(l1)
    let ll2 = convertNumbersArrayToLinkedList(l2)
    let result = addTwoNumbers(ll1, ll2)
    assert.deepStrictEqual(result, {
      val: 0,
      next: null,
    })
  })

  test('Adds numbers [9, 9, 9, 9, 9, 9, 9] and [9, 9, 9, 9]', () => {
    const l1 = [9, 9, 9, 9, 9, 9, 9]
    const l2 = [9, 9, 9, 9]
    let ll1 = convertNumbersArrayToLinkedList(l1)
    let ll2 = convertNumbersArrayToLinkedList(l2)
    let result = addTwoNumbers(ll1, ll2)
    assert.deepStrictEqual(result, {
      val: 8,
      next: {
        val: 9,
        next: {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 0,
              next: {
                val: 0,
                next: {
                  val: 0,
                  next: {
                    val: 1,
                    next: null,
                  },
                },
              },
            },
          },
        },
      },
    })
  })
})
