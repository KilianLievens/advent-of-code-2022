import { describe, expect, test } from '@jest/globals';
import findStart from './6';

describe('day 6', () => {
  test('it should correctly find the start of the packet with the example inputs', async () => {
    expect(await findStart('./input/6_1-example-input.txt')).toBe(7);
    expect(await findStart('./input/6_2-example-input.txt')).toBe(5);
    expect(await findStart('./input/6_3-example-input.txt')).toBe(6);
    expect(await findStart('./input/6_4-example-input.txt')).toBe(10);
    expect(await findStart('./input/6_5-example-input.txt')).toBe(11);
  });

  test('it should correctly find the start of the packet with the actual input', async () => {
    expect(await findStart('./input/6_1-actual-input.txt')).toBe(1760);
  });

  test('it should correctly find the start of the message with the example inputs', async () => {
    expect(await findStart('./input/6_1-example-input.txt', 14)).toBe(19);
    expect(await findStart('./input/6_2-example-input.txt', 14)).toBe(23);
    expect(await findStart('./input/6_3-example-input.txt', 14)).toBe(23);
    expect(await findStart('./input/6_4-example-input.txt', 14)).toBe(29);
    expect(await findStart('./input/6_5-example-input.txt', 14)).toBe(26);
  });

  test('it should correctly find the start of the message with the actual input', async () => {
    expect(await findStart('./input/6_1-actual-input.txt', 14)).toBe(2974);
  });
});
