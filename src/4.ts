import fs from 'fs';
import readline from 'readline';

function createRange(start: number, end: number): Set<number> {
  const result = new Set<number>();

  for (let i = start; i <= end; i++) {
    result.add(i);
  }

  return result;
}

function checkIntersect(setA: Set<number>, setB: Set<number>): boolean {
  for (const i of setA) {
    if (setB.has(i)) {
      return true
    }
  }
  return false;
}

export default async function getOverlap(
  fileName: string = './input/4_1-example-input.txt',
  mode: 'full' | 'segment' = 'full'
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);

  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let counter = 0
  for await (const line of readlineInterface) {
    const elfAssignments = line
      .split(',')
      .map(a => a
        .split('-')
        .map(b => parseInt(b, 10))
      );

    if (mode == 'full') {
      if (
        (elfAssignments[0][0] <= elfAssignments[1][0]
          && elfAssignments[0][1] >= elfAssignments[1][1])
        || (elfAssignments[0][0] >= elfAssignments[1][0]
          && elfAssignments[0][1] <= elfAssignments[1][1])
      ) {
        counter++;
      }
    }

    if (mode == 'segment') {
      const ranges = elfAssignments.map(c => createRange(c[0], c[1]));
      if (checkIntersect(ranges[0], ranges[1])){
        counter++;
      }
    }
  }

  return counter;
}

// getOverlap('./input/4_1-actual-input.txt', 'segment').then(a => {
//   console.log(a);
// });
