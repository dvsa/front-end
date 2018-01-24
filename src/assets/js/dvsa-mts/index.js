import { domReady, initGDS, initOldGDS } from './../shared';

/**
 * Load all MTS modules
 * once DOM is loaded and ready
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
domReady(() => {
  initGDS();
  initOldGDS();
});
