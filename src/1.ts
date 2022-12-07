import fs from 'fs';
import readline from 'readline';

export default async function identifyTopCalories(
  fileName: string = './input/1_1-example-input.txt',
  top: number = 3
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);

  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let calorieCounter = 0;
  let elfCounter = 1;
  const elfCalorieAmounts: { number: number, calories: number }[] = [];

  for await (const line of readlineInterface) {
    if (/^\s*$/.test(line)) {
      elfCalorieAmounts.push({ number: elfCounter, calories: calorieCounter });
      elfCounter++
      calorieCounter = 0;
    } else {
      calorieCounter += parseInt(line, 10);
    }
  }
  elfCalorieAmounts.push({ number: elfCounter, calories: calorieCounter });

  elfCalorieAmounts.sort((a, b) => (b.calories - a.calories));

  return elfCalorieAmounts.slice(0, top)
    .reduce((prev, cur) => { return prev + cur.calories }, 0)
}

identifyTopCalories('./input/1_1-actual-input.txt').then(r => {
  // console.log(r)
});
