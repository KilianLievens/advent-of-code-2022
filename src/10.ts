import fs from 'fs';
import readline from 'readline';

function calculateSignalStrengthAtCycle(cycleNumber: number, x: number, cyclesToCheck: number[]) {
  if (cyclesToCheck.includes(cycleNumber)) {
    return cycleNumber * x
  }

  return 0
}

function calculatePixel(cycleNumber: number, x: number, crtWidth: number): '#' | '.' {
  const width = cycleNumber % crtWidth;

  if (width === x || width === x - 1 || width === x + 1) {
    return '#'
  }

  return '.'
}

export default async function getSignalStrength(
  fileName: string = './input/10_1-example-input.txt',
  cyclesToCheck: number[] = [20, 60, 100, 140, 180, 220],
  crtWidth: number = 40,
  crtHeight: number = 6,

): Promise<number> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const instructions: { command: string, addX?: number }[] = []
  for await (const line of readlineInterface) {
    const [command, number] = line.split(' ');

    instructions.push({ command, addX: parseInt(number, 10) });
  }

  let instructionCounter = 0;
  let x = 1;
  let signal = 0;
  const crtLine: string[] = Array(crtWidth * crtHeight).fill('*');
  crtLine[0] = '#';

  for (let cycle = 1; instructionCounter < instructions.length; cycle++) {
    crtLine[cycle] = calculatePixel(cycle, x, crtWidth);
    signal += calculateSignalStrengthAtCycle(cycle, x, cyclesToCheck)

    const instruction = instructions[instructionCounter];

    if (instruction.command === 'addx') {
      if (instruction.addX == null) {
        throw new Error('Holy guacamoley you found a holey');
      }

      cycle++;

      signal += calculateSignalStrengthAtCycle(cycle, x, cyclesToCheck)

      x += instruction.addX
      crtLine[cycle] = calculatePixel(cycle, x, crtWidth);
    }

    instructionCounter++;
  }

  for (let k = 0; k < crtHeight; k++) {
    console.log([...crtLine].splice((crtWidth * k), crtWidth).join(''));
  }

  return signal;
}

// getSignalStrength('./input/10_1-actual-input-ega.txt').then(a => {
//   console.log(a);
// });
