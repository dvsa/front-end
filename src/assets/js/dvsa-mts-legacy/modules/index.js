import { initMotTestSearchVTSResults } from './mot-test-search-vts-results';
import { initMotTestSearchDateRangeResults } from './mot-test-search-date-range-results';
import { initMotTestSearchByVehichle } from './mot-test-search-by-vehicle';
import { initMotTestSearchVinVrm } from './mot-test-search-vin-vrm';

/**
 * MTS Legacy modules
 *
 * @since 1.2.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initModules = () => {
  initMotTestSearchVTSResults();
  initMotTestSearchDateRangeResults();
  initMotTestSearchByVehichle();
  initMotTestSearchVinVrm();
};
