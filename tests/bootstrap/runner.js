import puppeteer from 'puppeteer';
import config from './config';

import Browser from './browser';
import { startApp } from './../../src/server/app';

// Runs before all tests
before(async () => {
  process.env.PORT = config.port;
  await startApp();
  Browser.setupOptions(config);
});

// Runs after all tests
after(async () => {
  process.exit();
});