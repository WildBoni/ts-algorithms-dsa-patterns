/* 9 - palindrome-number
 *
 * Given an integer x, return true if x is palindrome integer.
 *
 * An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.
 *
 * Example 1:
 *
 * Input: x = 121
 * Output: true
 * Explanation: 121 reads as 121 from left to right and from right to left.
 *
 * Example 2:
 *
 * Input: x = -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
 * Example 3:
 *
 * Input: x = 10
 * Output: false
 * Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 * Example 4:
 *
 * Input: x = -101
 * Output: false
 *
 * Constraints:
 *
 * -231 <= x <= 231 - 1
 *
 * Follow up: Could you solve it without converting the integer to a string?
 */
function isPalindrome(x: number): boolean {
  if (x < 0) {
    return false
  }
  let reversed = 0
  let tempNum = x
  while (tempNum > 0) {
    let remainder = tempNum % 10
    tempNum = Math.floor(tempNum / 10)
    reversed = reversed * 10 + remainder
  }
  return x === reversed
}

console.log(isPalindrome(121)) // true
