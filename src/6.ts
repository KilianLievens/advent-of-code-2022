import fs from 'fs';
import readline from 'readline';

function hasDuplicates(arr: string[]): boolean {
  return new Set(arr).size !== arr.length
}

export default async function findStart(
  fileName: string = './input/6_1-example-input.txt',
  bufferLength: number = 4
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let counter = 0
  for await (const line of readlineInterface) {
    let buffer = [];
    const chars = line.split('');
    for (const char of chars) {
      counter++

      if (buffer.length === bufferLength) {
        buffer.shift();
        buffer.push(char);

        if (!hasDuplicates(buffer)) {
          break
        }

        continue;
      }

      buffer.push(char);
    }

    // Only process the one line
    break;
  }

  return counter
}

// findStart('./input/6_1-actual-input.txt', 14).then(a => {
//   console.log(a);
// });
