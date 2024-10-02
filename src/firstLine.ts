import fs from 'fs';
import readline from 'readline';

export namespace firstLine {
  /**
   * Gets the first line of a file.
   * @param path Path of the file to read.
   * @returns A promise to the first line of the specified file.
   */
  export async function get(path: string): Promise<string | null> {
    const input = fs.createReadStream(path) as fs.ReadStream & { fd: unknown };
    const reader = readline.createInterface({ input });
    const line = await new Promise<string | null>((resolve, reject) => {
      // Not reading the whole file results in Node keeping the hold of it.
      // No other adequate workaround found at the moment.
      let firstLine: string | null = null;
      reader.on('line', (line) => (firstLine = firstLine ?? line));
      reader.on('close', () => resolve(firstLine));
      input.on('error', reject);
    });
    // Warning: apparently does not close the file, see above.
    input.destroy();
    return line;
  }

  /**
   * Makes a copy of a file with its first line overwritten.
   * @param inpath Path of the file to copy.
   * @param outpath Path of the copy.
   * @param newline New first line to put in the copy.
   * @returns A void promise.
   */
  export async function set(inpath: string, outpath: string, newline: string): Promise<void> {
    const input = fs.createReadStream(inpath);
    const output = fs.createWriteStream(outpath);
    const reader = readline.createInterface({ input });
    await new Promise((resolve, reject) => {
      let replaced = false;
      reader.on('line', (currline) => {
        output.write(replaced ? currline : newline);
        output.write('\n');
        replaced = true;
      });
      reader.on('close', resolve);
      input.on('error', reject);
    });
    input.close();
    output.close();
  }
}
