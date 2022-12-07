import fs from 'fs';
import readline from 'readline';

const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function getPriority(char: string): number {
  return priorities.findIndex((a) => a === char)
}

export default async function sumPriorityOfItems(
  fileName: string = './input/3_1-example-input.txt',
  mode: 'wrongItem' | 'badges' = 'wrongItem'
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);

  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let sum = 0;
  let counter = 0;
  let setStack = [];

  for await (const line of readlineInterface) {
    if (mode === 'badges') {
      counter++;

      setStack.push(new Set(line.split('').map(getPriority)));

      if (counter % 3 === 0) {
        for (const i of setStack[2]) {
          if (setStack[0].has(i) && setStack[1].has(i)) {
            sum += i;
            setStack = [];
            break;
          }
        }
      }
    }

    if (mode === 'wrongItem') {
      const compartmentOne = line.slice(0, line.length / 2);
      const compartmentTwo = line.slice(line.length / 2, line.length);

      const c0Set = new Set(compartmentOne.split('').map(getPriority));

      for (const i of compartmentTwo) {
        const iPrio = getPriority(i);

        if (c0Set.has(iPrio)) {
          sum += iPrio;
          break;
        }
      }
    }
  }

  return sum;
}

sumPriorityOfItems('./input/3_1-actual-input.txt', 'badges').then(a => {
  // console.log(a);
});
