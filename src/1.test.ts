import { describe, expect, test } from '@jest/globals';
import identifyTopCalories from './1';

describe('day 1', () => {
  test('it should correctly identify the amount of calories the top elf is carrying with the example input', async () => {
    const answer = await identifyTopCalories('./input/1_1-example-input.txt', 1);

    expect(answer).toBe(24000);
  });

  test('it should correctly identify the amount of calories the top elf is carrying with test input 0', async () => {
    const answer = await identifyTopCalories('./input/1_1-custom-test-input-0.txt',1);

    expect(answer).toBe(400);
  });

  test('it should correctly identify the amount of calories the top elf is carrying with the actual input', async () => {
    const answer = await identifyTopCalories('./input/1_1-actual-input.txt',1);

    expect(answer).toBe(66186);
  });

  test('it should correctly identify the sum of the top 3 calories with example input', async () => {
    const answer = await identifyTopCalories('./input/1_1-example-input.txt');

    expect(answer).toBe(45000);
  });

  test('it should correctly identify the sum of the top 3 calories with custom input', async () => {
    const answer = await identifyTopCalories('./input/1_1-custom-test-input-0.txt');

    expect(answer).toBe(700);
  });

  test('it should correctly identify the sum of the top 3 calories with actual input', async () => {
    const answer = await identifyTopCalories('./input/1_1-actual-input.txt');

    expect(answer).toBe(196804);
  });
});
