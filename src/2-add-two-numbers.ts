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

const l1 = [2, 4, 3]
const l2 = [5, 6, 4]

let ll1 = convertNumbersArrayToLinkedList(l1)
let ll2 = convertNumbersArrayToLinkedList(l2)
let rll1 = reverseLinkedList(ll1)
let rll2 = reverseLinkedList(ll2)
let result = addTwoNumbers(rll1, rll2)
function convertNumbersArrayToLinkedList(arr: number[]) {
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

function reverseLinkedList(list: ListNode | null): ListNode | null {
  let prev: ListNode | null = null
  let current: ListNode | null = list
  let next: ListNode | null = null

  while (current) {
    next = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev
}

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {}
