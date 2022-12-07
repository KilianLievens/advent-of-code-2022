import { describe, expect, test } from '@jest/globals';
import getStackTops from './5';

describe('day 5', () => {
  test('it should correctly determine the top of the stacks with the example input', async () => {
    const result = await getStackTops('./input/5_1-example-input.txt', 3, 'single');

    expect(result).toBe('CMZ');
  });

  test('it should correctly determine the top of the stacks with the actual input', async () => {
    const result = await getStackTops('./input/5_1-actual-input.txt', 9, 'single');

    expect(result).toBe('SPFMVDTZT');
  });

  test('it should correctly determine the top of the stacks with the example input in multi mode', async () => {
    const result = await getStackTops('./input/5_1-example-input.txt', 3, 'multi');

    expect(result).toBe('MCD');
  });

  test('it should correctly determine the top of the stacks with the actual input in multi mode', async () => {
    const result = await getStackTops('./input/5_1-actual-input.txt', 9, 'multi');

    expect(result).toBe('ZFSJBPRFP');
  });
})
