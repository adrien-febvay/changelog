// import { mkdirSync, rmSync, writeFileSync } from 'fs';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { firstLine } from '@/firstLine';

/** Temporary directory for tests. */
export class TempDir {
  public path = '';

  /** Create the temporary directory. */
  public create(): string {
    if (!this.path) {
      this.path = fs.mkdtempSync(path.join(os.tmpdir(), 'changelog-test-'));
    }
    return this.path;
  }

  /** Destroys the temporary directory. */
  public destroy(): void {
    if (this.path) {
      fs.rmSync(this.path, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 100,
      });
      this.path = '';
    }
  }

  /**
   * Sets a temporary file for test purposes.
   * @param file File to create/overwrite.
   * @param content File content.
   */
  public set(file: string, content: string): void {
    const filepath = path.join(this.path, file);
    fs.writeFileSync(filepath, content, { encoding: 'utf-8' });
  }

  /**
   * Gets the first line of a temporary file.
   * @param file File to read.
   */
  public head(file: string): Promise<string | null> {
    return firstLine.get(path.join(this.path, file));
  }
}
