import { describe, expect, test } from '@jest/globals';
import inspectPackets from './13';

describe('day 13', () => {
  test('it should correctly inspect the packets with the example input', async () => {
    expect(await inspectPackets('./input/13_1-example-input.txt')).toBe(13);
  });

  test('it should correctly inspect the packets with the actual input', async () => {
    expect(await inspectPackets('./input/13_1-actual-input.txt')).toBe(6046);
  });

  test('it should correctly order the packets with the example input', async () => {
    expect(await inspectPackets('./input/13_1-example-input.txt', 'orderFixing')).toBe(140);
  });

  test('it should correctly order the packets with the actual input', async () => {
    expect(await inspectPackets('./input/13_1-actual-input.txt', 'orderFixing')).toBe(21423);
  });
});
