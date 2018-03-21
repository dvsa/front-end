import { initAccordions } from './accordions';
import { initCritieraValidation } from './criteria-validation';
import { initSelectToggle } from './select-toggle';
import { initDoubleClickPrevention } from './double-click-prevention';
import { initMarkRepairs } from './mark-repairs';
import { initShowHideToggle } from './show-hide-toggle';
import { initFormDisableDetailsHiddenFields } from './form-submit-disable-details-hidden-fields';
import { initOdometerReading } from './odometer-reading';
import { initFormDisableOnSubmit } from './form-disable-on-submit';

/**
 * Custom DVSA Modules
 *
 * @since 1.0.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const initModules = () => {
  initAccordions();
  initCritieraValidation();
  initSelectToggle();
  initDoubleClickPrevention();
  initMarkRepairs();
  initShowHideToggle();
  initFormDisableDetailsHiddenFields();
  initOdometerReading();
  initFormDisableOnSubmit();
};
