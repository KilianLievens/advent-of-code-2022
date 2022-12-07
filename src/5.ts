import fs from 'fs';
import readline from 'readline';

export default async function getStackTops(
  fileName: string = './input/5_1-example-input.txt',
  stackCount: number = 3,
  moveMode: 'single' | 'multi' = 'single'
): Promise<string> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let doneWithStacks = false;
  const stacks: string[][] = Array(stackCount).fill(0).map(_ => []);

  for await (const line of readlineInterface) {
    const chars = line.split('');

    if (chars[1] === '1') {
      doneWithStacks = true;
      stacks.map(s => s.reverse());

      continue;
    }

    if (!doneWithStacks) {
      for (let j = 0; j < stackCount; j++) {
        const charNum = 1 + (j * 4);

        if (chars[charNum] !== ' ' && chars[charNum] != null) {
          stacks[j].push(chars[charNum])
        }
      }

      continue;
    }

    // Whitespace line
    if (/^\s*$/.test(line)) {
      continue
    }

    const numbers = line.split(' ').filter(Number).map(n => parseInt(n, 10));

    if (moveMode === 'single') {
      for (let i = 0; i < numbers[0]; i++) {
        stacks[numbers[2] - 1].push(stacks[numbers[1] - 1].pop()!)
      }
    }

    if (moveMode === 'multi') {
      let toStack = stacks[numbers[2] - 1];
      let fromStack = stacks[numbers[1] - 1];

      const moving = fromStack.slice(fromStack.length - numbers[0], fromStack.length);
      stacks[numbers[1] - 1] = fromStack.slice(0, fromStack.length - numbers[0]);
      stacks[numbers[2] - 1] = toStack.concat(moving);
    }
  }

  return stacks.map(s => s.pop()).join('');
}

// getStackTops('./input/5_1-actual-input.txt', 9, 'multi').then(a => {
//   console.log(a);
// });
