// Polyfills
import 'babel-polyfill';
import './../third-party';

import { domReady } from './../shared';
import { initModules } from './modules';

domReady(() => {
  initModules();
});
