import fs from 'fs';
import readline from 'readline';

export default async function calculateTrees(
  fileName: string = './input/8_1-example-input.txt',
): Promise<{ visibleTreeCount: number, scenicValue: number }> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const trees: number[][] = [];
  for await (const line of readlineInterface) {
    trees.push(line.split('').map(s => parseInt(s, 10)))
  }

  const horizontalRows = trees.length;
  const verticalRows = trees[0].length;

  const inverseTrees: number[][] = [];
  for (let y = 0; y < verticalRows; y++) {
    const yRow: number[] = []
    for (let x = 0; x < horizontalRows; x++) {
      yRow.push(trees[x][y])
    }
    inverseTrees.push(yRow);
  }

  // Surrounding trees
  let visibleTreeCount = (horizontalRows * 2) + (verticalRows * 2) - 4
  const scenicValues = [];

  for (let x = 1; x < (horizontalRows - 1); x++) {
    for (let y = 1; y < (verticalRows - 1); y++) {
      const treeSize = trees[x][y];
      const neighbourLines = [
        [...trees[x]].splice(0, y).reverse(),
        [...trees[x]].splice(y + 1),
        [...inverseTrees[y]].splice(0, x).reverse(),
        [...inverseTrees[y]].splice(x + 1)
      ];

      if (neighbourLines.some(nl => (nl.every(n => n < treeSize)))) {
        visibleTreeCount++;
      }

      const scenicLines = neighbourLines.map(nl => {
        const nextHighest = nl.findIndex((n) => (n >= treeSize))

        return nextHighest === -1 ? nl.length : (nextHighest + 1);
      });

      scenicValues.push(scenicLines.reduce((prev, cur) => (prev * cur), 1));
    }
  }

  scenicValues.sort((a, b) => (b - a));

  return { visibleTreeCount, scenicValue: scenicValues[0] };
}

// calculateTrees('./input/8_1-actual-input.txt').then(a => {
//   console.log(a);
// });
