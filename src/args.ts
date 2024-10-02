/**
 * Parses the command line arguments.
 * @param argv Command line arguments.
 * @returns The parsed command line arguments.
 */
export function args(...argv: string[]): args;

export function args(_cmd: string, _src: string, ...argv: string[]): args {
  /** Provided arguments. */
  const pargs = argv.filter((arg) => arg !== '--');

  /** Joined command line arguments. */
  const line = argv.join(' ').trim();

  /** Help mode, takes precedence over anything else. */
  const help = /(^| )(--)?help( |$)/.test(line) || !pargs.length;

  /** Mode, there must be one and only one argument provided. */
  const mode = help ? 'help' : args.parseMode(pargs.length === 1 && pargs[0]);

  return { line, mode };
}

/** Parsed command line arguments. */
export type args = { line: string; mode: string | null };

/* istanbul ignore next */
export namespace args {
  /** Available utility modes. */
  export const modes = ['check', 'update', 'version'] as const;

  /**
   * Parse utility mode parameter.
   * @param param Parameter to parse.
   * @returns Parsed utility mode.
   */
  export function parseMode(param?: string | false): (typeof modes)[number] | null {
    if (param) {
      for (const mode of modes) {
        const alias = mode.slice(0, 1);
        if (param === mode || param === alias) {
          return mode;
        } else if (param === `-${alias}` || param === `--${mode}`) {
          return mode;
        }
      }
    }
    return null;
  }
}
