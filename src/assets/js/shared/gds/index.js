import { initModules } from './modules';
import { initOldSpecModules } from './old-spec-modules';

/**
 * Current spec GDS modules
 *
 * @since 1.0.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initGDS = () => {
  initModules();
};

/**
 * Old spec GDS modules which should be
 * deprecated and will need to be removed in future
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initOldGDS = () => {
  initOldSpecModules();
};
