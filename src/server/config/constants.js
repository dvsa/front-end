import path from 'path';

export const SRC_PATH = path.resolve('src', 'server');

export const isDevelopment = () => {
  return process.env.NODE_ENV == 'development';
};

export const isTesting = () => {
  return process.env.NODE_ENV == 'testing';
};

let config = {
  port: process.env.PORT || 3002,
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  appURL: 'https://lpg-prototypes.herokuapp.com',
  paths: {
    src: SRC_PATH,
    views: {
      base: path.join(SRC_PATH, 'views'),
    },
    assets: path.join(SRC_PATH, 'assets'),
    data: path.join(SRC_PATH, 'data'),
    publicAssets: isDevelopment() ? path.resolve('public') : path.resolve('dist', 'assets'),
  },
};

if (isDevelopment()) {
  config = {
    ...config,
    appURL: `http://localhost:${config.port}`,
  };
}

export const CONFIG = config;
