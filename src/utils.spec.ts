import { _ } from '@/utils';

describe('The utilities', () => {
  it('shift the identation of a string', () => {
    expect(_.indent('foo\n  bar')).toBe('foo\n  bar');
    expect(_.indent('foo\n  bar', 2)).toBe('  foo\n    bar');
    expect(_.indent('foo\n  bar', 0, false)).toBe('foo\nbar');
    expect(_.indent('foo\n  bar', 2, false)).toBe('foo\n    bar');
    expect(_.indent('foo\n  bar', -2, false)).toBe('foo\nbar');
  });
});
