import { type } from '@/type';

describe('The type helpers', () => {
  const err = new Error();
  const fn = (): null => null;

  it('detect the type of a value', () => {
    expect(type(null)).toBe('null');
    expect(type([])).toBe('array');
    expect(type(err)).toBe('instance of Error');
    expect(type({})).toBe('object');
    expect(type(void 0)).toBe('undefined');
    expect(type(fn)).toBe('function');
    expect(type(123)).toBe('number');
    expect(type(false)).toBe('boolean');
    expect(type('^^')).toBe('string');
    expect(type(BigInt(1))).toBe('bigint');
  });

  it('detect a dictionary', () => {
    expect(type.dict(null)).toBe(null);
    expect(type.dict([])).toBe(null);
    expect(type.dict(err)).toBe(err);
    expect(type.dict({})).toStrictEqual({});
    expect(type.dict(void 0)).toBe(null);
    expect(type.dict(fn)).toBe(null);
    expect(type.dict(123)).toBe(null);
    expect(type.dict(false)).toBe(null);
    expect(type.dict('^^')).toBe(null);
    expect(type.dict(BigInt(1))).toBe(null);

    expect(type.isDict(null)).toBe(false);
    expect(type.isDict([])).toBe(false);
    expect(type.isDict(err)).toBe(true);
    expect(type.isDict({})).toBe(true);
    expect(type.isDict(void 0)).toBe(false);
    expect(type.isDict(fn)).toBe(false);
    expect(type.isDict(123)).toBe(false);
    expect(type.isDict(false)).toBe(false);
    expect(type.isDict('^^')).toBe(false);
    expect(type.isDict(BigInt(1))).toBe(false);
  });

  it('detects an error instance', () => {
    const error_like = { message: 'a', name: 'b', stack: 'c' };

    expect(type.error(null)).toBe(null);
    expect(type.error([])).toBe(null);
    expect(type.error(err)).toBe(err);
    expect(type.error(error_like)).toStrictEqual(error_like);
    expect(type.error({})).toBe(null);
    expect(type.error(void 0)).toBe(null);
    expect(type.error(fn)).toBe(null);
    expect(type.error(123)).toBe(null);
    expect(type.error(false)).toBe(null);
    expect(type.error('^^')).toBe(null);
    expect(type.error(BigInt(1))).toBe(null);

    expect(type.isError(null)).toBe(false);
    expect(type.isError([])).toBe(false);
    expect(type.isError(err)).toBe(true);
    expect(type.isError(error_like)).toBe(true);
    expect(type.isError({})).toBe(false);
    expect(type.isError(void 0)).toBe(false);
    expect(type.isError(fn)).toBe(false);
    expect(type.isError(123)).toBe(false);
    expect(type.isError(false)).toBe(false);
    expect(type.isError('^^')).toBe(false);
    expect(type.isError(BigInt(1))).toBe(false);
  });

  it('detect an accessible value', () => {
    expect(type.accessible(null)).toBe(null);
    expect(type.accessible([])).toEqual([]);
    expect(type.accessible(err)).toBe(err);
    expect(type.accessible({})).toEqual({});
    expect(type.accessible(void 0)).toBe(null);
    expect(type.accessible(fn)).toBe(fn);
    expect(type.accessible(123)).toBe(123);
    expect(type.accessible(false)).toBe(false);
    expect(type.accessible('^^')).toBe('^^');
    expect(type.accessible(BigInt(1))).toBe(BigInt(1));

    expect(type.isAccessible(null)).toBe(false);
    expect(type.isAccessible([])).toBe(true);
    expect(type.isAccessible(err)).toBe(true);
    expect(type.isAccessible({})).toBe(true);
    expect(type.isAccessible(void 0)).toBe(false);
    expect(type.isAccessible(fn)).toBe(true);
    expect(type.isAccessible(123)).toBe(true);
    expect(type.isAccessible(false)).toBe(true);
    expect(type.isAccessible('^^')).toBe(true);
    expect(type.isAccessible(BigInt(1))).toBe(true);
  });
});
