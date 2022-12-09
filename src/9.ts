import fs from 'fs';
import readline from 'readline';

type Position = {
  x: number;
  y: number;
}

const DIRECTIONS = {
  RIGHT: 'R',
  LEFT: 'L',
  UP: 'U',
  DOWN: 'D',
}

function moveHead(hPos: Position, direction: string): Position {
  if (direction === DIRECTIONS.UP) {
    return { x: hPos.x, y: hPos.y + 1 }
  }

  if (direction === DIRECTIONS.DOWN) {
    return { x: hPos.x, y: hPos.y - 1 }
  }

  if (direction === DIRECTIONS.LEFT) {
    return { x: hPos.x - 1, y: hPos.y }
  }

  if (direction === DIRECTIONS.RIGHT) {
    return { x: hPos.x + 1, y: hPos.y }
  }

  throw new Error('It broke yo');
}

function diffPos(axis: 'y' | 'x', hPos: Position, tPos: Position): number {
  return hPos[axis] - tPos[axis];
}

function followTail(hPos: Position, tPos: Position): Position {
  const xDiff = diffPos('x', hPos, tPos);
  const yDiff = diffPos('y', hPos, tPos);

  if (Math.abs(yDiff) > 1) {
    let xMovement = 0
    if (xDiff !== 0) {
      xMovement = xDiff > 0 ? 1 : -1;
    }
    const yMovement = yDiff > 0 ? 1 : -1;
    return { x: tPos.x + xMovement, y: tPos.y + yMovement }
  }

  if (Math.abs(xDiff) > 1) {
    let yMovement = 0
    if (yDiff !== 0) {
      yMovement = yDiff > 0 ? 1 : -1;
    }
    const xMovement = xDiff > 0 ? 1 : -1;
    return { x: tPos.x + xMovement, y: tPos.y + yMovement }
  }

  return tPos;
}

export default async function calculateVisitedPositions(
  fileName: string = './input/9_1-example-input.txt',
  length: number = 2
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const seenPositions: Set<string> = new Set();
  const knots = new Array(length).fill({ x: 0, y: 0 });

  for await (const line of readlineInterface) {
    const [direction, rawAmount] = line.split(' ');
    const amount = parseInt(rawAmount, 10);

    for (let i = 0; i < amount; i++) {
      knots[0] = moveHead(knots[0], direction);

      for (let j = 1; j < length; j++) {
        knots[j] = followTail(knots[j - 1], knots[j]);
      }

      seenPositions.add(`${knots[length - 1].x}_${knots[length - 1].y}`);
    }
  }

  return seenPositions.size;
}

// calculateVisitedPositions('./input/9_1-example-input.txt').then(a => {
//   console.log(a);
// });
