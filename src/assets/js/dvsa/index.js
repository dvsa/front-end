import store from 'store';
import expirePlugin from 'store/plugins/expire';
import { domReady } from './../shared';
import { AccordionInitializer } from './components';
import { initGDSComponents } from './gds';

// Third-party
import './third-party';

// Add expiry plugin for store
store.addPlugin(expirePlugin);

domReady(() => {

  // GDS Components
  initGDSComponents();

  // Accordions component
  AccordionInitializer();

});