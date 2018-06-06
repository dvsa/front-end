import { initCritieraValidation } from './criteria-validation';
import { initSelectToggle } from './select-toggle';
import { initDoubleClickPrevention } from './double-click-prevention';
import { initMarkRepairs } from './mark-repairs';
import { initShowHideToggle } from './show-hide-toggle';
import { initFormDisableDetailsHiddenFields } from './form-submit-disable-details-hidden-fields';
import { initFormDisableOnSubmit } from './form-disable-on-submit';
import { initMotTestSearch } from './mot-test-search';
import { initDvsaBrakeTestConfiguration } from './dvsa-brake-test-configuration';
import { initDvsaEnforcementTestSummary } from './dvsa-enforcement-test-summary';
import { initDvsaDbt } from './dvsa-dbt';

/**
 * MTS Application modules
 *
 * @since 1.2.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initModules = () => {
  initCritieraValidation();
  initSelectToggle();
  initDoubleClickPrevention();
  initMarkRepairs();
  initShowHideToggle();
  initFormDisableDetailsHiddenFields();
  initFormDisableOnSubmit();
  initMotTestSearch();
  initDvsaBrakeTestConfiguration();
  initDvsaEnforcementTestSummary();
  initDvsaDbt();
};
