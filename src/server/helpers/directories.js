import fs from 'fs';
import path from 'path';
import nodeDir from 'node-dir';

export const isDirectory = source => fs.lstatSync(source).isDirectory();

export const getDirectories = source => {
  return fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);
};

export const getAllFilePathsWithinPath = async path => {
  // Creates a promise since the function uses a callback
  return new Promise((resolve, reject) => {
    nodeDir.paths(path, (err, paths) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(paths.files);
    });
  });
};