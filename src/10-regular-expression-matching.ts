/* 10. Regular Expression Matching

Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 
Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".


Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

Example 3:
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
 

Constraints:
1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

function isMatch(s: string, p: string): boolean {
  return checkMatchingChars(0, 0, s, p)
}

function checkMatchingChars(
  i: number,
  j: number,
  s: string,
  p: string
): boolean {
  let sLength = s.length
  let pLength = p.length

  if (j === pLength) {
    return i === sLength
  }

  if (j + 1 < pLength && p[j + 1] === '*') {
    if (checkMatchingChars(i, j + 2, s, p)) return true
    while (i < sLength && (p[j] === '.' || p[j] === s[i])) {
      i++
      if (checkMatchingChars(i, j + 2, s, p)) return true
    }
  }

  if (i < sLength && (p[j] === '.' || p[j] === s[i])) {
    return checkMatchingChars(i + 1, j + 1, s, p)
  }
  return false
}

console.log(isMatch('abc', 'ab*c'))
