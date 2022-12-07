import fs from 'fs';
import readline from 'readline';

export class Dir {
  private readonly name;
  private readonly parentDir: Dir | null;
  private files: number[] = [];
  private dirs: Dir[] = [];

  public print(nested: number = 0) {
    console.log(`${' '.repeat(nested)}I am dir ${this.name}`);
    console.log(`${' '.repeat(nested)}I contain these files: ${this.files.join(' ')}`);
    if (this.dirs.length !== 0) {
      console.log(`${' '.repeat(nested)}I contain these dirs:`);
      this.dirs.forEach(d => d.print(nested + 2))
    }
  }

  public getSum(): number {
    return this.dirs.reduce((a, b) => (a + b.getSum()), 0) +
      this.files.reduce((a, b) => (a + b), 0);
  }

  public getDirs(): Dir[] {
    return this.dirs.concat(
      this.dirs.reduce((prev, cur) => (prev.concat(cur.getDirs())), <Dir[]>[])
    );
  }

  public getOrCreateSubDir(name: string) {
    const subDir = this.dirs.find(d => d.name === name)

    if (subDir != null) {
      return subDir
    }

    return new Dir(name, this);
  }

  public addFile(file: number) {
    this.files.push(file);
  }

  public addDir(dir: Dir) {
    this.dirs.push(dir);
  }

  public getParentDir(): Dir | null {
    return this.parentDir;
  }

  constructor(name: string, parent: Dir | null) {
    this.name = name;
    this.parentDir = parent;
  }
}

export default async function calculateDirSizes(
  fileName: string = './input/7_1-example-input.txt',
  mode: 'cumulative' | 'toBeDeleted' = 'cumulative',
  updateSize: number = 30000000,
  totalFileSystemSize: number = 70000000
): Promise<number> {
  const fileStream = fs.createReadStream(fileName);
  const readlineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const rootDir = new Dir('/', null);
  let pwd = rootDir;
  for await (const line of readlineInterface) {
    if (line === '$ cd /') {
      pwd = rootDir;

      continue;
    }

    if (line.substring(0, 4) === '$ ls') {
      continue;
    }

    if (line === '$ cd ..') {
      const temp = pwd.getParentDir()
      if (temp == null) { throw new Error('its broken yo'); }
      pwd = temp;

      continue;
    }

    if (line.substring(0, 4) === '$ cd') {
      const temp = pwd.getOrCreateSubDir(line.substring(5))
      pwd = temp;

      continue;
    }

    const segments = line.split(' ');

    if (segments[0] === 'dir') {
      pwd.addDir(new Dir(segments[1], pwd));

      continue;
    }

    pwd.addFile(parseInt(segments[0], 10));
  }

  // rootDir.print();

  const dirs = rootDir.getDirs().map(d => d.getSum());

  if (mode === 'cumulative') {
    return dirs.reduce((prev, cur) => {

      if (cur > 100000) {
        return prev;
      }

      return prev + cur
    }, 0);
  }

  const availableSpace = totalFileSystemSize - rootDir.getSum();
  const neededSpace = updateSize - availableSpace;

  return dirs.sort((a, b) => (a - b)).find(d => d > neededSpace) ?? -1
}

// calculateDirSizes('./input/7_1-actual-input.txt', 'toBeDeleted').then(a => {
//   console.log(a);
// });
