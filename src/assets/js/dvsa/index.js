import store from 'store';
import expirePlugin from 'store/plugins/expire';

import { domReady, initGDS } from './../shared';
import { initModules } from './modules';

// Third-party
import './../third-party';

// Polyfills
import 'core-js/es6/array';

// Add expiry plugin for store
store.addPlugin(expirePlugin);

domReady(() => {
  // GDS
  initGDS();

  // Modules
  initModules();
});
