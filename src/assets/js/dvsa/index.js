import store from 'store';
import expirePlugin from 'store/plugins/expire';

import { domReady } from './../shared';
import { initModules } from './modules';
import { initGDS } from './gds';

import FastClick from 'fastclick';

// Third-party
import './third-party';

// Add expiry plugin for store
store.addPlugin(expirePlugin);

domReady(() => {
  FastClick.attach(document.body);

  // GDS
  initGDS();

  // Modules
  initModules();
});
