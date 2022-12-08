import { describe, expect, test } from '@jest/globals';
import calculateTrees from './8';

describe('day 8', () => {
  test('it should correctly find the visible trees with the example input', async () => {
    expect((await calculateTrees('./input/8_1-example-input.txt')).visibleTreeCount).toBe(21);
  });

  test('it should correctly find the visible trees with the actual input', async () => {
    expect((await calculateTrees('./input/8_1-actual-input.txt')).visibleTreeCount).toBe(1832);
  });

  test('it should correctly find the most scenic tree with the example input', async () => {
    expect((await calculateTrees('./input/8_1-example-input.txt')).scenicValue).toBe(8);
  });

  test('it should correctly find the most scenic tree with the actual input', async () => {
    expect((await calculateTrees('./input/8_1-actual-input.txt')).scenicValue).toBe(157320);
  });
});
