// Polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../third-party';

import { domReady, initGDS } from './../shared';
import { initModules } from './modules';

domReady(() => {
  initGDS();
  initModules();
});
