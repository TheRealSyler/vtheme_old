// @ts-nocheck
import { walk, read, write, getPath } from './utils';
import { transformSync } from '@babel/core';
import { basename } from 'path';
import chalk from 'chalk';
import { exec } from 'child_process';

async function build() {
  const now = process.hrtime.bigint();
  let canEnd = false;
  exec('tsc -b', err => {
    if (err) console.log(err);
    if (canEnd) {
      end(now);
    } else {
      canEnd = true;
    }
  });
  try {
    const filesPaths = await walk('./src');
    for (let i = 0; i < filesPaths.length; i++) {
      const path = filesPaths[i];
      const file = await read(path);
      const name = basename(path);
      const transformed = transformSync(file.toString(), {
        plugins: ['@babel/plugin-transform-typescript'],
        filename: name,
        minified: true
      });
      const relativeOutPath = getPath(path, 'dist');
      write(relativeOutPath.concat('.js'), transformed.code).catch(err => console.log(err));
    }
    if (canEnd) {
      end(now);
    } else {
      canEnd = true;
    }
  } catch (error) {
    console.log(error);
  }
}
build();

function end(now: bigint) {
  console.log(chalk.green('Build Time -', ((process.hrtime.bigint() - now) / BigInt(1e6)).toString(), 'ms'));
}
