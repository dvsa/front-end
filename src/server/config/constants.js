import path from 'path';

export const SRC_PATH = path.resolve('src', 'server');

export const CONFIG = {
  port: 3002,
  sessionSecret: 'secret',
  paths: {
    src: SRC_PATH,
    views: {
      base: path.join(SRC_PATH, 'views'),
    },
    assets: path.join(SRC_PATH, 'assets'),
    data: path.join(SRC_PATH, 'data'),
  },
};
