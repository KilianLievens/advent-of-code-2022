import { describe, expect, test } from '@jest/globals';
import calculateVisitedPositions from './9';

describe('day 9', () => {
  test('it should correctly find the calculate the visited positions with the example input', async () => {
    expect(await calculateVisitedPositions('./input/9_1-example-input.txt')).toBe(13);
  });

  test('it should correctly find the calculate the visited positions with the actual input', async () => {
    expect(await calculateVisitedPositions('./input/9_1-actual-input.txt')).toBe(6367);
  });

  test('it should correctly find the calculate the visited positions with length 10 with the example input', async () => {
    expect(await calculateVisitedPositions('./input/9_1-example-input.txt', 10)).toBe(1);
  });

  test('it should correctly find the calculate the visited positions with length 10 with the second example input', async () => {
    expect(await calculateVisitedPositions('./input/9_2-example-input.txt', 10)).toBe(36);
  });

  test('it should correctly find the calculate the visited positions with length 10 the actual input', async () => {
    expect(await calculateVisitedPositions('./input/9_1-actual-input.txt', 10)).toBe(2536);
  });
});
