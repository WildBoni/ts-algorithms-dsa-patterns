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
  let end = start + 1

  while (start < sLength - 1) {
    while (s[start] !== s[end] && end < sLength) {
      end++
    }
    while (s[start] === s[end] && start > 0 && end < sLength) {
      console.log(`same: ${s[start]}, ${s[end]}`)
      start--
      end++
    }
    start++
    end = start + 1
  }

  return result
}

longestPalindrome('abcdbadef')
