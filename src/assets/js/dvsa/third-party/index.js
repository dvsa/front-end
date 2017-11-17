import './details-polyfill';
import 'core-js/fn/array/from';
import 'core-js/fn/array/for-each';
import 'element-closest';
import 'blissfuljs';

if (GOVUK && GOVUK.details) {
  GOVUK.details.init();
}
