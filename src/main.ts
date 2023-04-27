import { args } from '@/args';
import { processChangelog } from '@/processChangelog';
import { _ } from '@/utils';

/**
 * Main script.
 * @param argv Command line arguments.
 * @returns A string to issue on the standard output.
 */
export async function main(...argv: string[]): Promise<string> {
  const { line: argline, mode } = args(...argv);

  if (!mode) {
    const argjson = JSON.stringify(argline);
    const argstr = argjson.slice(1, -1).replace(/\\"/g, '"');
    throw new Error(`${main.INVALID_PARAMS}${argstr}\n\n${main.SYNTAX}`);
  } else if (mode === 'help') {
    return main.SYNTAX;
  } else if (mode !== 'version') {
    await processChangelog(mode === 'update');
    return '';
  } else if (main.npm_package_version) {
    return main.npm_package_version;
  } else {
    throw new Error('Utility version not available');
  }
}

/* istanbul ignore next */
export namespace main {
  /** Beginning of the invalid parameters error message. */
  export const INVALID_PARAMS = 'Invalid parameters: ';

  /** Utility syntax. */
  export const SYNTAX = _.str`
    Syntax: npx changelog [mode]

    Checks or updates the \`CHANGELOG.md\` file.

    Mode:
      [-]c  [--]check    Only checks if the file is ready for a new version,
                         meaning its first line is exactly "# Dev".
      [-]u  [--]update   Updates the file with the new version,
                         setting its first line to "# Version x.x.x"
                         where "x.x.x" is the version number of your project.
                         It will ignore pre-release versions (like "x.x.x-pre").
      [-]v  [--]version  Prompts the version of this utility.
    
    In order to secure \`npm version\`, the package scripts should include:
    - "preversion": "changelog check"
    - "version": "changelog update && git add CHANGELOG.md"
  `;

  /** Directory in which operate. */
  export const dir = process.cwd();

  /** ChangeLog utility version, copied for test purposes. */
  export const npm_package_version = process.env.npm_package_version;
}
