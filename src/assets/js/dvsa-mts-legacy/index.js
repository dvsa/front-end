// Polyfills
import 'babel-polyfill';
import './../third-party';

import jQuery from 'jquery';
import { domReady } from './../shared';
import { initModules } from './modules';

domReady(() => {
  initModules();
});
