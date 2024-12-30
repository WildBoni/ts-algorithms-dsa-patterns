/* Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
*/

export function longestPalindrome(s: string): string {
  let sLength = s.length
  let result = ''

  let start = 0
  let maxLength = 0

  for (let i = 0; i < sLength; i++) {
    let left = i
    let right = i

    while (left >= 0 && right < sLength && s[left] === s[right]) {
      let length = left - right + 1
      if (length > maxLength) {
        maxLength = length
        start = left
      }
      left--
      right++
    }
  }

  result = s.slice(start, maxLength)
  return result
}

console.log(longestPalindrome('acas'))
