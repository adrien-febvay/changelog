import { TempDir } from '@/__jest__/TempDir';
import { main } from '@/main';
import { processChangelog } from '@/processChangelog';

/** ChangeLog utility version. */
const version = process.env.npm_package_version ?? '';

/** Temporary directory for test purposes. */
const tempDir = new TempDir();

/**
 * To test the ChangeLog utility main function.
 * @param argline Command line arguments.
 * @returns A string supposed to be issued on the standard output.
 */
async function __main(argline = ''): Promise<string> {
  const pargs = argline ? argline.trim().split(/\s+/) : [];
  return main('cmd', __filename, ...pargs);
}

describe('The ChangeLog utility main script', () => {
  beforeAll(() => Object.assign(main, { dir: tempDir.create() }));

  afterAll(() => tempDir.destroy());

  it('issues its syntax', async () => {
    expect(await __main()).toBe(main.SYNTAX);
  });

  it('rejects invalid arguments', async () => {
    await expect(__main('foo')).rejects.toThrow(
      `Invalid parameters: foo\n${main.SYNTAX}`,
    );
  });

  it('outputs its version', async () => {
    expect(process.env.npm_package_version).toMatch(/./);
    expect(await __main('version')).toBe(version);
  });

  it('rejects an empty `CHANGELOG.md`', async () => {
    tempDir.set('CHANGELOG.md', '');
    await expect(__main('check')).rejects.toThrow('Empty file CHANGELOG.md');
  });

  it('rejects an empty first line in `CHANGELOG.md`', async () => {
    tempDir.set('CHANGELOG.md', '\n');
    await expect(__main('check')).rejects.toThrow(processChangelog.InvalidFile);
  });

  it('validates a correct `CHANGELOG.md`', async () => {
    tempDir.set('CHANGELOG.md', '# Dev\n- Some changes\n');
    expect(await __main('check')).toBe('');
  });

  it('does not update `CHANGELOG.md` with prerelease version', async () => {
    tempDir.set('package.json', '{ "version": "3.2.1-pre" }');
    expect(await __main('update')).toBe('');
    expect(await tempDir.head('CHANGELOG.md')).toBe(`# Dev`);
  });

  it('updates `CHANGELOG.md` with release version', async () => {
    tempDir.set('package.json', '{ "version": "3.2.1" }');
    expect(await __main('update')).toBe('');
    expect(await tempDir.head('CHANGELOG.md')).toBe(`# Version 3.2.1`);
  });

  it('rejects an incorrect CHANGELOG.md', async () => {
    await expect(__main('check')).rejects.toThrow(processChangelog.InvalidFile);
  });

  it('rejects when the ChangeLog utility has no package version', async () => {
    Object.assign(main, { npm_package_version: void 0 });
    await expect(__main('version')).rejects.toThrow(
      'Utility version not available',
    );
  });
});
