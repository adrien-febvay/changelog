import { args } from '@/args';

/**
 * To test the command line arguments parser.
 * @param argline Command line arguments.
 * @returns The parsed command line arguments.
 */
function __args(argline = ''): args {
  const pargs = argline ? argline.trim().split(/\s+/) : [];
  return args('cmd', __filename, ...pargs);
}

describe('The command line arguments parser', () => {
  it('selects the help mode', () => {
    expect(__args().mode).toBe('help');
    expect(__args('--').mode).toBe('help');
    expect(__args('help').mode).toBe('help');
    expect(__args('--help').mode).toBe('help');
    expect(__args('-- help').mode).toBe('help');
    expect(__args('-- --help').mode).toBe('help');
    expect(__args('-- -- help').mode).toBe('help');
    expect(__args('-- -- --help').mode).toBe('help');
    expect(__args('-- version help').mode).toBe('help');
    expect(__args('-- version --help').mode).toBe('help');
  });

  it('rejects invalid arguments', () => {
    expect(__args('foo').mode).toBe(null);
    expect(__args('-- version foo').mode).toBe(null);
  });

  it('detects the mode', () => {
    expect(__args('c').mode).toBe('check');
    expect(__args('-c').mode).toBe('check');
    expect(__args('check').mode).toBe('check');
    expect(__args('--check').mode).toBe('check');
    expect(__args('u').mode).toBe('update');
    expect(__args('-u').mode).toBe('update');
    expect(__args('update').mode).toBe('update');
    expect(__args('--update').mode).toBe('update');
    expect(__args('v').mode).toBe('version');
    expect(__args('-v').mode).toBe('version');
    expect(__args('version').mode).toBe('version');
    expect(__args('--version').mode).toBe('version');
  });
});
