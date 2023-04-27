import { execSync } from 'child_process';

describe('The entry point', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: ['ignore', 'ignore', 'pipe'] });
  });

  it('shows result on the standard output', () => {
    expect(execSync('node dist', { encoding: 'utf-8' })).toMatch(/./);
  });

  it('exits with an error status', () => {
    expect(() => execSync('node dist foo', { stdio: 'ignore' })).toThrow(
      'Command failed: node dist foo',
    );
  });
});
