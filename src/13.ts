import fs from 'fs';
import readline from 'readline';

function compareItems(a: unknown[], b: unknown[]): boolean | null {
  for (let i = 0; i < b.length; i++) {
    if (i > a.length - 1) {
      return true
    }

    const aItem = a[i];
    const bItem = b[i];

    if (typeof aItem === 'number' && typeof bItem === 'number') {
      if (aItem === bItem) {
        continue
      }

      return aItem < bItem
    }

    const castA: unknown[] = Array.isArray(aItem) ? aItem : [aItem];
    const castB: unknown[] = Array.isArray(bItem) ? bItem : [bItem];

    const result = compareItems(castA, castB);

    if (result !== null) {
      return result
    }
  }

  if (a.length > b.length) {
    return false
  }

  return null;
}

export default async function inspectPackets(
  fileName: string = './input/13_1-example-input.txt',
  mode: 'pairComparison' | 'orderFixing' = 'pairComparison'
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const pairs: unknown[][][] = []
  const packets: unknown[][] = []
  let currentPair: unknown[][] = []

  for await (const line of readlineInterface) {
    if (line == "") {
      pairs.push(currentPair);
      currentPair = []

      continue;
    }

    currentPair.push(JSON.parse(line));
    packets.push(JSON.parse(line));
  }

  if (mode === 'pairComparison') {
    let result = 0;
    for (let i = 0; i < pairs.length; i++) {
      const isInCorrectOrder = compareItems(pairs[i][0], pairs[i][1])

      if (isInCorrectOrder === null) {
        throw new Error('really? damn it');
      }

      if (isInCorrectOrder === true) {
        result += i + 1
      }
    }

    return result;
  }

  // Mode orderFixing
  packets.push([[2]]);
  packets.push([[6]]);
  packets.sort((a, b) => (compareItems(a, b) === true ? -1 : 1));

  let twoIndex = 0
  let sixIndex = 0
  const twoSearch = JSON.stringify([[2]])
  const sixSearch = JSON.stringify([[6]])

  for (let i = 0; i < packets.length; i++) {
    if (JSON.stringify(packets[i]) === twoSearch) {
      twoIndex = i + 1
    }

    if (JSON.stringify(packets[i]) === sixSearch) {
      sixIndex = i + 1
      break
    }
  }

  return twoIndex * sixIndex;
}

// inspectPackets('./input/13_1-actual-input.txt', 'orderFixing').then(a => {
//   console.log(a);
// });
