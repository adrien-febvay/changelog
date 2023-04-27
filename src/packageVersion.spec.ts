import { TempDir } from '@/__jest__/TempDir';
import { packageVersion } from '@/packageVersion';

/** Temporary directory for test purposes. */
const tempDir = new TempDir();

/** Gets the version of the fake package. */
function getVersion(): () => string {
  return () => packageVersion.get(tempDir.path);
}

describe('The ChangeLog utility main script', () => {
  beforeAll(() => tempDir.create());

  afterAll(() => tempDir.destroy());

  it('rejects invalid JSON', () => {
    tempDir.set('package.json', 'bad');
    expect(getVersion()).toThrow(SyntaxError);
  });

  it('rejects invalid package', () => {
    tempDir.set('package.json', 'null');
    expect(getVersion()).toThrow(
      'Invalid package.json: expected object, got null',
    );
  });

  it('rejects package without version', () => {
    tempDir.set('package.json', '{}');
    expect(getVersion()).toThrow('Invalid package.json: missing version');
  });

  it('rejects package with invalid version', () => {
    tempDir.set('package.json', '{ "version": 1 }');
    expect(getVersion()).toThrow(
      'Invalid version in package.json: expected string, got number',
    );
  });

  it('rejects package with invalid version pattern', () => {
    tempDir.set('package.json', '{ "version": "1" }');
    expect(getVersion()).toThrow(
      'Invalid version in package.json: expected pattern like 0.0.0[-pre], got "1"',
    );
  });
});
