/* 
Given a 32-bit signed integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example1: x = 123, return 321
Example2: x = -123, return -321
Example3: x = 120, return 21
*/

function reverse(x: number): number {
  let solution = 0
  let maxAllowed = 2 ** 31 - 1
  let minAllowed = -(2 ** 31)

  let reversedAbsNumber = Number(
    Math.abs(x).toString().split('').reverse().join('')
  )
  solution = x < 0 ? reversedAbsNumber * -1 : reversedAbsNumber

  return solution < maxAllowed && solution > minAllowed ? solution : 0
}

console.log(reverse(1534236469))
