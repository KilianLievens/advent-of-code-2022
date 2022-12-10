import { describe, expect, test } from '@jest/globals';
import getSignalStrength from './10';

describe('day 10', () => {
  test('it should correctly find the signal strength with the example input', async () => {
    expect(await getSignalStrength('./input/10_1-example-input.txt')).toBe(13140);
  });

  test('it should correctly find the signal strength with the actual input', async () => {
    expect(await getSignalStrength('./input/10_1-actual-input.txt')).toBe(13760);
  });
});
