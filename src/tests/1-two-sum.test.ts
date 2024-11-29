import { test } from 'node:test';
import assert from 'node:assert';
import { twoSum } from '../1-two-sum.js';

test('Two Sum', async (t) => {
  await t.test('should return indices of the two numbers that add up to the target', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    assert.deepStrictEqual(result, [0, 1]);
  });

  await t.test('should handle negative numbers', () => {
    const nums = [-3, 4, 3, 90];
    const target = 0;
    const result = twoSum(nums, target);
    assert.deepStrictEqual(result, [0, 2]);
  });

  await t.test('should handle multiple pairs', () => {
    const nums = [1, 3, 3, 6];
    const target = 6;
    const result = twoSum(nums, target);
    assert.deepStrictEqual(result, [1, 2]); // First valid pair
  });

  await t.test('should throw an error if no solution exists', () => {
    const nums = [1, 2, 3];
    const target = 7;
    assert.throws(() => twoSum(nums, target), Error);
  });
});