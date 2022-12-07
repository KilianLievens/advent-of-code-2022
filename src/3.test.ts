import { describe, expect, test } from '@jest/globals';
import sumPriorityOfItems, { getPriority } from './3';

describe('day 3', () => {
  test('it should get the correct priority of letters', async () => {
    expect(getPriority('a')).toBe(1);
    expect(getPriority('Z')).toBe(52);
    expect(getPriority('p')).toBe(16);
  });

  test('it should correctly determine the sum with the example input', async () => {
    const result = await sumPriorityOfItems();

    expect(result).toBe(157);
  });

  test('it should correctly determine the sum with the actual input', async () => {
    const result = await sumPriorityOfItems('./input/3_1-actual-input.txt');

    expect(result).toBe(8072);
  });

  test('it should correctly determine the sum of the badges with the example input', async () => {
    const result = await sumPriorityOfItems('./input/3_1-example-input.txt', 'badges');

    expect(result).toBe(70);
  });

  test('it should correctly determine the sum of the badges with the actual input', async () => {
    const result = await sumPriorityOfItems('./input/3_1-actual-input.txt', 'badges');

    expect(result).toBe(2567);
  });
});
