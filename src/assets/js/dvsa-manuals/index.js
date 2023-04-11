// Polyfills
import "core-js/stable";
import './../third-party';

import { domReady, initGDS } from './../shared';
import { initModules } from './modules';

domReady(() => {
  initGDS();
  initModules();
});
