import fs from 'fs';

import { resolve } from 'path';

import { type } from '@/type';

export namespace packageVersion {
  /** Package version pattern. */
  export const pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[-\w]+)?$/;

  /**
   * Gets the version of a package in the specified path.
   * @param path Path of the package to read.
   * @returns The version of the specified package.
   */
  export function get(...path: string[]): string {
    const file = resolve(...path, 'package.json');
    const packageJson = fs.readFileSync(file, 'utf8');
    try {
      const packageParsed: unknown = JSON.parse(packageJson);
      const packageDict = type.dict(packageParsed);
      const packageVersion = packageDict?.version;
      if (!packageDict) {
        const issue = `expected object, got ${type(packageParsed)}`;
        throw new Error(`Invalid package.json: ${issue}`);
      } else if (packageVersion === void 0) {
        throw new Error('Invalid package.json: missing version');
      } else if (typeof packageVersion !== 'string') {
        const issue = `expected string, got ${type(packageVersion)}`;
        throw new Error(`Invalid version in package.json: ${issue}`);
      } else if (!pattern.test(packageVersion)) {
        const escapedVersion = JSON.stringify(packageVersion);
        const issue = `expected pattern like 0.0.0[-pre], got ${escapedVersion}`;
        throw new Error(`Invalid version in package.json: ${issue}`);
      } else {
        return packageVersion;
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new SyntaxError(err.message.replace('JSON', 'package.json'));
      } else {
        throw err;
      }
    }
  }
}
