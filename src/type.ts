/**
 * Gets the type of a value.
 * @param val Value to get the type of.
 * @returns The type of the provided value.
 */
export function type(val: unknown): string {
  if (val === null) {
    return 'null';
  } else if (val instanceof Array) {
    return 'array';
  } else if (typeof val === 'object') {
    const name = type.accessible(Object.getPrototypeOf(val))?.constructor.name;
    return name && name !== 'Object' ? `instance of ${name}` : 'object';
  } else {
    return typeof val;
  }
}

/* istanbul ignore next */
export namespace type {
  /** Unknown dictionary. */
  export type Dict = { [_ in string]: unknown };

  /**
   * Checks if a value is a dictionary.
   * @param val Value to check.
   * @returns A boolean accordingly.
   */
  export function isDict(val: unknown): val is Dict {
    return val ? typeof val === 'object' && !(val instanceof Array) : false;
  }

  /**
   * Return the provided value if it is a dictionary, `null` otherwise.
   * @param val Value to return.
   * @returns The provided value or `null`.
   */
  export function dict(val: unknown): Dict | null {
    return isDict(val) ? val : null;
  }

  /** Any error. */
  export type Error = Accessible & globalThis.Error;

  /**
   * Checks if a value is an object.
   * @param val Value to check.
   * @returns A boolean accordingly.
   */
  export function isError(val: unknown): val is Error {
    return (
      val instanceof Error ||
      (isDict(val) && typeof val.message === 'string' && typeof val.name === 'string' && typeof val.stack === 'string')
    );
  }

  /**
   * Return the provided value if it is an object, `null` otherwise.
   * @param val Value to return.
   * @returns The provided value or `null`.
   */
  export function error(val: unknown): Error | null {
    return isError(val) ? val : null;
  }

  /** Accessible value. */
  export type Accessible = { [_ in string | number | symbol]: unknown };

  /**
   * Checks if a value is accessible.
   * @param val Value to check.
   * @returns A boolean accordingly.
   */
  export function isAccessible(val: unknown): val is Accessible {
    return val != null;
  }

  /**
   * Return the provided value if it is accessible, `null` otherwise.
   * @param val Value to return.
   * @returns The provided value or `null`.
   */
  export function accessible(val: unknown): Accessible | null {
    return isAccessible(val) ? val : null;
  }
}
