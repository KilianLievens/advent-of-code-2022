import { describe, expect, test } from '@jest/globals';
import calculatePoints from './2';

describe('day 2', () => {
  test('it should correctly get the correct amount of points if you follow the strategy guide with the example input', async () => {
    const answer = await calculatePoints('./input/2_1-example-input.txt');

    expect(answer).toBe(15);
  });

  test('it should correctly get the correct amount of points if you follow the strategy guide with the custom input', async () => {
    const answer = await calculatePoints('./input/2_1-custom-test-input-0.txt');

    expect(answer).toBe(31);
  });

  test('it should correctly get the correct amount of points if you follow the strategy guide with the actual input', async () => {
    const answer = await calculatePoints('./input/2_1-actual-input.txt');

    expect(answer).toBe(15632);
  });

  test('it should correctly get the correct amount of points if you follow the revised strategy guide with the example input', async () => {
    const answer = await calculatePoints('./input/2_1-example-input.txt', 'endings');

    expect(answer).toBe(12);
  });

  test('it should correctly get the correct amount of points if you follow the revised strategy guide with the actual input', async () => {
    const answer = await calculatePoints('./input/2_1-actual-input.txt', 'endings');

    expect(answer).toBe(14416);
  });
});
