import path from 'path';

export const SRC_PATH = path.resolve('src', 'server');

let config = {
  port: process.env.PORT || 3002,
  sessionSecret: 'secret',
  appURL: 'https://dvsa-front-end.herokuapp.com',
  paths: {
    src: SRC_PATH,
    views: {
      base: path.join(SRC_PATH, 'views'),
    },
    assets: path.join(SRC_PATH, 'assets'),
    data: path.join(SRC_PATH, 'data'),
  },
};

if (process.env.NODE_ENV == 'development') {
  config = {
    ...config,
    appURL: `http://localhost:${config.port}`,
  };
}

export default config;
