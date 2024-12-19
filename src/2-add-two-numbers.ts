// leetcode add two numbers problem
// /**
//  * You are given two non-empty linked lists representing two non-negative integers.
//  * The digits are stored in reverse order, and each of their nodes contains a single digit.
//  * Add the two numbers and return the sum as a linked list.
//  * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//  *
//  * @param l1 - Head of the first linked list
//  * @param l2 - Head of the second linked list
//  * @returns Head of the resulting linked list
/*
    Constraints:
    The number of nodes in each linked list is in the range [1, 100].
    0 <= Node.val <= 9
    It is guaranteed that the list represents a number that does not have leading zeros.
*/

import { link } from 'node:fs'

type ListNode = {
  val: number
  next: ListNode | null
}

const l1 = [2, 4, 9]
const l2 = [5, 6, 4, 9]

let ll1 = convertNumbersArrayToLinkedList(l1)
let ll2 = convertNumbersArrayToLinkedList(l2)
let result = addTwoNumbers(ll1, ll2)
console.log(JSON.stringify(result))

export function convertNumbersArrayToLinkedList(arr: number[]) {
  let linkedList: ListNode | null = null
  let head: ListNode | null = null

  arr.forEach((num) => {
    let newNode: ListNode = { val: num, next: null }
    if (!head) {
      linkedList = newNode
      head = linkedList
    } else {
      head.next = newNode
      head = head.next
    }
  })

  return linkedList
}

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let p1 = l1
  let p2 = l2
  let carry = false
  let result: ListNode | null = null
  let head: ListNode | null = null

  while (p1 || p2) {
    const sum: number = (p1?.val || 0) + (p2?.val || 0) + +carry
    carry = sum > 9
    const newVal = sum % 10
    if (!head) {
      result = { val: newVal, next: null }
      head = result
    } else {
      head.next = { val: newVal, next: null }
      head = head.next
    }
    p1 = p1?.next || null
    p2 = p2?.next || null
  }

  if (carry) {
    head!.next = { val: 1, next: null }
  }
  return result
}
