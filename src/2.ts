import fs from 'fs';
import readline from 'readline';

const Shapes = {
  ROCK: 'A',
  PAPER: 'B',
  SCISSORS: 'C',
}

const ResponseShapes = {
  ROCK: 'X',
  PAPER: 'Y',
  SCISSORS: 'Z',
}

const Endings = {
  LOSE: 'X',
  DRAW: 'Y',
  WIN: 'Z',
}

function rockPaperScissorsPoints(inputShape: string, responseShape: string): number {
  if (inputShape === Shapes.ROCK) {
    if (responseShape === ResponseShapes.ROCK) {
      return 3
    }
    if (responseShape === ResponseShapes.PAPER) {
      return 6
    }
    return 0
  }

  if (inputShape === Shapes.PAPER) {
    if (responseShape === ResponseShapes.ROCK) {
      return 0
    }
    if (responseShape === ResponseShapes.PAPER) {
      return 3
    }
    return 6
  }

  if (inputShape === Shapes.SCISSORS) {
    if (responseShape === ResponseShapes.ROCK) {
      return 6
    }
    if (responseShape === ResponseShapes.PAPER) {
      return 0
    }
    return 3
  }

  throw new Error('Failed to find inputShape');
}

function shapePoints(inputShape: string, ending: string): number {
  if (inputShape === Shapes.ROCK) {
    if (ending === Endings.DRAW) {
      return 1
    }
    if (ending === Endings.WIN) {
      return 2
    }
    return 3
  }

  if (inputShape === Shapes.PAPER) {
    if (ending === Endings.DRAW) {
      return 2
    }
    if (ending === Endings.WIN) {
      return 3
    }
    return 1
  }

  if (inputShape === Shapes.SCISSORS) {
    if (ending === Endings.DRAW) {
      return 3
    }
    if (ending === Endings.WIN) {
      return 1
    }
    return 2
  }

  throw new Error('Failed to find inputShape');
}

export default async function calculatePoints(
  fileName: string = './input/2_1-example-input.txt',
  mode: 'shapes' | 'endings' = 'shapes'
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);

  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let points = 0
  for await (const line of readlineInterface) {
    const [input, response] = line.split(' ');

    if (mode === 'shapes') {
      switch (response) {
        case ResponseShapes.ROCK:
          points += 1 + rockPaperScissorsPoints(input, response)
          break;
        case ResponseShapes.PAPER:
          points += 2 + rockPaperScissorsPoints(input, response)
          break;
        case ResponseShapes.SCISSORS:
          points += 3 + rockPaperScissorsPoints(input, response)
          break;
      }
    }
    if (mode === 'endings') {
      switch (response) {
        case Endings.LOSE:
          points += 0 + shapePoints(input, response)
          break;
        case Endings.DRAW:
          points += 3 + shapePoints(input, response)
          break;
        case Endings.WIN:
          points += 6 + shapePoints(input, response)
          break;
      }
    }
  }

  return points
}

calculatePoints('./input/2_1-actual-input.txt', 'endings').then(r => {
  // console.log(r)
});
