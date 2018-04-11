// Polyfills
import 'babel-polyfill';
import './../third-party';

import { domReady, initGDS } from './../shared';
import { initModules } from './modules';

domReady(() => {
  // GDS
  initGDS();

  // Modules
  initModules();
});
