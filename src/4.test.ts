import { describe, expect, test } from '@jest/globals';
import getOverlap from './4';

describe('day 4', () => {
  test('it should correctly determine the full overlaps with the example input', async () => {
    const result = await getOverlap('./input/4_1-example-input.txt');

    expect(result).toBe(2);
  });

  test('it should correctly determine the full overlaps with the actual input', async () => {
    const result = await getOverlap('./input/4_1-actual-input.txt');

    expect(result).toBe(509);
  });

  test('it should correctly determine the segment overlaps with the example input', async () => {
    const result = await getOverlap('./input/4_1-example-input.txt', 'segment');

    expect(result).toBe(4);
  });

  test('it should correctly determine the segment overlaps with the actual input', async () => {
    const result = await getOverlap('./input/4_1-actual-input.txt', 'segment');

    expect(result).toBe(870);
  });
})
