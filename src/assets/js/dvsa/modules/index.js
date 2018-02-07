import { initAccordions } from './accordions';
import { initCritieraValidation } from './criteria-validation';
import { initSelectToggle } from './select-toggle';
import { initDoubleClickPrevention } from './double-click-prevention';
import { initMarkRepairs } from './mark-repairs';
import { initShowHideToggle } from './show-hide-toggle';

export const initModules = () => {
  initAccordions();
  initCritieraValidation();
  initSelectToggle();
  initDoubleClickPrevention();
  initMarkRepairs();
  initShowHideToggle();
};
