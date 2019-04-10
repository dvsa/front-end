import { initCritieraValidation } from './criteria-validation';
import { initSelectToggle } from './select-toggle';
import { initDoubleClickPrevention } from './double-click-prevention';
import { initMarkRepairs } from './mark-repairs';
import { initShowHideToggle } from './show-hide-toggle';
import { initFormDisableDetailsHiddenFields } from './form-submit-disable-details-hidden-fields';
import { initOdometerReading } from './odometer-reading';
import { initFormDisableOnSubmit } from './form-disable-on-submit';
import { initMotTestSearch } from './mot-test-search';
import { initCheckAll } from './check-all';
import { initMessageFilter } from './filter-messages';
import { initMtsLogin } from './mts-login';

/**
 * MTS Application modules
 *
 * This change makes no difference
 *
 * @since 1.2.0
 * @author Tameem Safi <t.safi@kainos.com>
 * @author James Nelson <j.nelson@kainos.com>
 * @author Martin Di Martino <martind@kainos.com>
 */
export const initModules = () => {
  initCritieraValidation();
  initSelectToggle();
  initDoubleClickPrevention();
  initMarkRepairs();
  initShowHideToggle();
  initFormDisableDetailsHiddenFields();
  initOdometerReading();
  initFormDisableOnSubmit();
  initMotTestSearch();
  initCheckAll();
  initMessageFilter();
  initMtsLogin();
};
