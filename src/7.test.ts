import { describe, expect, test } from '@jest/globals';
import calculateDirSizes from './7';

describe('day 7', () => {
  test('it should correctly find the cumulative dirsizes with the example input', async () => {
    expect(await calculateDirSizes('./input/7_1-example-input.txt')).toBe(95437);
  });

  test('it should correctly find the cumulative dirsizes with the actual input', async () => {
    expect(await calculateDirSizes('./input/7_1-actual-input.txt')).toBe(1243729);
  });

  test('it should correctly find the dirsize of the correct dir to delete with the example input', async () => {
    expect(await calculateDirSizes('./input/7_1-example-input.txt', 'toBeDeleted')).toBe(24933642);
  });

  test('it should correctly find the dirsize of the correct dir to delete with the actual input', async () => {
    expect(await calculateDirSizes('./input/7_1-actual-input.txt', 'toBeDeleted')).toBe(4443914);
  });
});
