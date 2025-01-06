// write comments of leetcode exercise number 4

/* Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5
*/

export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  let arr1Pointer = 0
  let arr2Pointer = 0

  let arr1Length = nums1.length
  let arr2Length = nums2.length
  let totalLength = arr1Length + arr2Length

  let median1 = 0
  let median2 = 0

  for (let i = 0; i <= totalLength / 2; i++) {
    median2 = median1
    if (
      arr1Pointer < arr1Length &&
      (arr2Pointer >= arr2Length || nums1[arr1Pointer] <= nums2[arr2Pointer])
    ) {
      median1 = nums1[arr1Pointer++]
    } else {
      median1 = nums2[arr2Pointer++]
    }
  }

  let result = totalLength % 2 === 1 ? median1 : (median1 + median2) / 2

  return isNaN(result) ? 0 : result
}

console.log(findMedianSortedArrays([1, 2], [2, 3, 4]))
