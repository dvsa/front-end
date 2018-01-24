import 'babel-polyfill';
import store from 'store';
import expirePlugin from 'store/plugins/expire';

import { domReady, initGDS } from './../shared';
import { initModules } from './modules';

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
