#!/usr/bin/env node
import { main } from '@/main';
import { type } from '@/type';

main(...process.argv)
  .then((stdout) => {
    if (stdout) {
      console.log(stdout);
    }
  })
  .catch((err) => {
    let code = 2;
    if (err instanceof Error) {
      if (err.message.startsWith(main.INVALID_PARAMS)) {
        code = 1;
      }
      console.error(err.message);
    } else {
      code = 500;
      console.error(`Weird error: expected Error instance, got ${type(err)}`);
      console.error(err);
    }
    process.exit(code);
  });
