import 'babel-polyfill';
import store from 'store';
import expirePlugin from 'store/plugins/expire';

import { domReady } from './../shared';
import { initModules } from './modules';
import { initGDS } from './gds';

// Third-party
import './third-party';

// Add expiry plugin for store
store.addPlugin(expirePlugin);

domReady(() => {
  // GDS
  initGDS();

  // Modules
  initModules();
});
