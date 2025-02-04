/* 15. Three sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 
Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Constraints:
3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

// two sum - like approach (fails with very large arrays)
// function threeSum(nums: number[]): number[][] {
//   let result: number[][] = []
//   let numMap: { [key: string]: number } = {}

//   for (let i = 0; i < nums.length - 1; i++) {
//     let target = nums[i] * -1
//     for (let j = i + 1; j < nums.length; j++) {
//       let complement = target - nums[j]
//       if (
//         numMap[complement] &&
//         numMap[complement] !== i &&
//         numMap[complement] !== j
//       ) {
//         let newTriplet = [nums[i], nums[j], nums[numMap[complement]]]
//         newTriplet.sort((a, b) => a - b)
//         if (JSON.stringify(result).indexOf(JSON.stringify(newTriplet)) === -1) {
//           result.push(newTriplet)
//         }
//       } else {
//         numMap[nums[j]] = j
//       }
//     }
//   }
//   return result
// }

// quicker two pointer implementation
function threeSum(nums: number[]): number[][] {
  let result: number[][] = []

  let sortedNums = nums.sort((a, b) => a - b)

  for (let i = 0; i < sortedNums.length - 2; i++) {
    if (sortedNums[i - 1] === sortedNums[i]) {
      continue
    }
    let complement: number = sortedNums[i] * -1
    let j = i + 1
    let k = sortedNums.length - 1

    while (j < k) {
      let sum = sortedNums[j] + sortedNums[k]
      if (sum === complement) {
        result.push([sortedNums[i], sortedNums[j], sortedNums[k]])
        j++
        k--
        while (sortedNums[j + 1] === sortedNums[j]) {
          j++
        }
        while (sortedNums[k - 1] === sortedNums[k]) {
          k--
        }
      } else if (sum > complement) {
        k--
      } else if (sum < complement) {
        j++
      }
    }
  }

  return result
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0, 0, 0]))
// console.log(threeSum([0, 1, 1]))
console.log(threeSum([-1, 0, 1, 0]))
