import fs from 'fs';
import os from 'os';

import { join } from 'path';

import { firstLine } from '@/firstLine';
import { packageVersion } from '@/packageVersion';
import { main } from '@/main';
import { _ } from '@/utils';

/**
 * Processes CHANGELOG file: checks it and eventually updates it.
 * @param update Update the CHANGELOG file? Otherwise just check it.
 * @returns A void promise.
 */
export async function processChangelog(update: boolean): Promise<void> {
  const file = join(main.dir, processChangelog.FILE);
  const version = update ? packageVersion.get(main.dir) : null;
  const currline = await firstLine.get(file);
  if (currline == null) {
    throw new Error(`Empty file ${processChangelog.FILE}`);
  } else if (currline !== '# Dev') {
    const line = JSON.stringify(currline).replace(/\\"/g, '"').slice(1, -1);
    throw new processChangelog.InvalidFile(line);
  } else if (version?.includes('-') === false) {
    const tmpdir = fs.mkdtempSync(join(os.tmpdir(), 'changelog-'));
    const tmpfile = join(tmpdir, processChangelog.FILE);
    const versionLine = `# Version ${version}`;
    fs.copyFileSync(file, tmpfile);
    await firstLine.set(tmpfile, file, versionLine);
    fs.rmSync(tmpdir, { recursive: true, force: true });
  }
}

/* istanbul ignore next */
export namespace processChangelog {
  /** CHANGELOG filename. */
  export const FILE = 'CHANGELOG.md';

  /** Error message for invalid CHANGELOG. */
  export const INVALID_FILE = _.str`
    Invalid file ${FILE}
      Expected its first line to be:
        # Dev
      Got instead:
        $LINE
  `;

  /** Invalid `CHANGELOG.md` file error. */
  export class InvalidFile extends Error {
    /** First line found in file. */
    public readonly firstLine: string;

    /**
     * Instanciates an invalid `CHANGELOG.md` file error.
     * @param firstLine First line found in file.
     */
    public constructor(firstLine: string) {
      if (firstLine) {
        super(INVALID_FILE.replace('$LINE', firstLine));
      } else {
        super(INVALID_FILE.replace(/instead.*/, 'empty line instead'));
      }
      this.firstLine = firstLine;
    }
  }
}
