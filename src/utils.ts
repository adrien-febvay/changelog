export namespace _ {
  /**
   * Shifts the indentation of a string.
   * @param str String to shift the indentation of.
   * @param width Indentation width to shift, positive for shift right,
   * negative for shift left, `0` to shift left as much as possible.
   * @param head Shifts the indentation at the beginning of the string,
   * default `true` when shifting left, `false` when shifting right.
   * @returns The indentation shifted string.
   */
  export function indent(str: string, width = 0, head = true): string {
    let _width = width;
    if (_width === 0) {
      const pattern = head ? /(^|\n)( *)(?=\S)/g : /(\n)( *)(?=\S)/g;
      const matches = [...str.matchAll(pattern)] as [string, string, string][];
      const indents = matches.map((match) => match[2].length);
      const min = Math.min(...indents);
      _width = matches.length && -min;
    }
    if (_width > 0) {
      const spaces = new Array(_width + 1).join(' ');
      return str.replace(head ? /(^|\n)/g : /(\n)/g, `$1${spaces}`);
    } else if (_width < 0) {
      const spaces = ` {1,${String(-_width)}}`;
      const pattern = head ? `(^|\n)${spaces}` : `(\n)${spaces}`;
      return str.replace(new RegExp(pattern, 'g'), '$1');
    }
    return str;
  }

  /** Templating function which removes source indentation. */
  export function str(raw: TemplateStringsArray, ...vals: string[]): string {
    return indent(String.raw({ raw }, ...vals), 0).replace(/^\n|\n$/g, '');
  }
}
