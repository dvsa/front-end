import { initManualSmartSurvey } from './manual-smart-survey';
import { initDvsaManualMeta } from './dvsa-manual-meta';

/**
 * Manuals application modules
 *
 * @since 1.2.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initModules = () => {
  initManualSmartSurvey();
  initDvsaManualMeta();
};
