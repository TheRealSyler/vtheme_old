// @ts-nocheck
import { readdir, stat, readFile, outputFile } from 'fs-extra';
import { resolve, relative } from 'path';
import { exec } from 'child_process';

export function walk(dir: string) {
  return new Promise<string[]>((_resolve, reject) => {
    let results: string[] = [];
    readdir(dir, function(err, list) {
      if (err) return reject(err);
      let pending = list.length;
      let completed = true;
      if (!pending) {
        return _resolve(list);
      }
      list.forEach(function(file) {
        file = resolve(dir, file);
        stat(file, async function(err, stat) {
          if (err) return reject(err);
          if (stat && stat.isDirectory()) {
            completed = false;
            const a = await walk(file);
            results.push(...a);
            if (!--pending) {
              return _resolve(results);
            }
          } else {
            results.push(file);
            if (!--pending && completed) {
              return _resolve(results);
            }
          }
        });
      });
    });
  });
}

export function read(dir: string) {
  return new Promise<Buffer>((_resolve, reject) => {
    readFile(dir, (err, data) => {
      if (err) reject(err);
      _resolve(data);
    });
  });
}
export function write(dir: string, data: string) {
  return new Promise<Buffer>((_resolve, reject) => {
    outputFile(dir, data, err => {
      if (err) reject(err);
      _resolve();
    });
  });
}
export function getPath(dir: string, newFolder: string) {
  return relative('./', dir)
    .replace(/^[.\w-]*\\/, `${newFolder}\\`)
    .replace(/\.[\w]*$/, '');
}
